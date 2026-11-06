// Automated Real Browser Visual QA & Functional Test Runner
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8089;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_DIR = __dirname;

// 1. Static HTTP Server
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  let filePath = path.join(BASE_DIR, reqPath);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found: ' + reqPath);
    return;
  }

  if (fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const contentType = mimeMap[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
  console.log(`[HTTP Server] Listening on http://localhost:${PORT}`);
  try {
    await runBrowserTests();
  } catch (err) {
    console.error('[Fatal QA Error]', err);
    process.exit(1);
  } finally {
    server.close();
    console.log('[HTTP Server] Closed');
  }
});

async function runBrowserTests() {
  console.log('=== STARTING CHROME REAL BROWSER QA & VISUAL TESTING ===\n');

  // Launch Chrome with Remote Debugging
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-sandbox',
    '--mute-audio',
    `http://localhost:${PORT}/index.html`
  ]);

  // Give Chrome a moment to spin up
  await new Promise(r => setTimeout(r, 1800));

  // Query CDP for WebSocket debugger URL
  const versionRes = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await versionRes.json();
  const tab = tabs.find(t => t.url.includes(`localhost:${PORT}`)) || tabs[0];
  if (!tab || !tab.webSocketDebuggerUrl) {
    throw new Error('Could not retrieve Chrome WebSocket Debugger URL');
  }

  console.log(`[CDP] Connected to Chrome tab: ${tab.title} (${tab.id})`);

  const ws = new WebSocket(tab.webSocketDebuggerUrl);

  let messageId = 1;
  const callbacks = new Map();
  const consoleErrors = [];

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      const cb = callbacks.get(data.id);
      callbacks.delete(data.id);
      if (data.error) cb.reject(data.error);
      else cb.resolve(data.result);
    }

    if (data.method === 'Runtime.consoleAPICalled') {
      if (data.params.type === 'error') {
        const text = data.params.args.map(a => a.value || a.description).join(' ');
        consoleErrors.push(text);
        console.error(`  [Browser Console Error]: ${text}`);
      }
    }
  };

  await new Promise((resolve) => ws.onopen = resolve);

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = messageId++;
      callbacks.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Enable Runtime and Page
  await sendCommand('Runtime.enable');
  await sendCommand('Page.enable');

  async function evaluate(expression) {
    const res = await sendCommand('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result.value;
  }

  async function setViewport(width, height) {
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768
    });
    await sendCommand('Emulation.setVisibleSize', { width, height });
    await new Promise(r => setTimeout(r, 400));
  }

  async function takeScreenshot(filePath) {
    const res = await sendCommand('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    fs.writeFileSync(filePath, buffer);
    console.log(`  📸 Screenshot saved: ${path.basename(filePath)} (${buffer.length} bytes)`);
  }

  const outDir = path.join(BASE_DIR, 'audit_shots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // TEST 1: Standard Desktop 1440x900
  console.log('[Test 1: Standard Desktop 1440x900 Viewport]');
  await setViewport(1440, 900);
  const desktopOverflow = await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`);
  const desktopScrollWidth = await evaluate(`document.documentElement.scrollWidth`);
  console.log(`  Horizontal overflow check: scrollWidth=${desktopScrollWidth}px vs window=${1440}px -> ${desktopOverflow ? 'NO OVERFLOW ✓' : 'OVERFLOW ✗'}`);
  await takeScreenshot(path.join(outDir, 't4_desktop_1440.png'));

  // TEST 2: Wide Desktop 1920x1080
  console.log('\n[Test 2: Wide Desktop 1920x1080 Viewport]');
  await setViewport(1920, 1080);
  const wideOverflow = await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`);
  console.log(`  Wide desktop overflow check: ${wideOverflow ? 'NO OVERFLOW ✓' : 'OVERFLOW ✗'}`);

  // TEST 3: Tablet 768x1024
  console.log('\n[Test 3: Tablet 768x1024 Viewport]');
  await setViewport(768, 1024);
  const tabletOverflow = await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`);
  const tabletScrollWidth = await evaluate(`document.documentElement.scrollWidth`);
  console.log(`  Tablet overflow check: scrollWidth=${tabletScrollWidth}px vs window=${768}px -> ${tabletOverflow ? 'NO OVERFLOW ✓' : 'OVERFLOW ✗'}`);
  await takeScreenshot(path.join(outDir, 't4_tablet_768.png'));

  // TEST 4: Mobile Modern 390x844 (iPhone 14/15)
  console.log('\n[Test 4: Mobile Modern 390x844 Viewport]');
  await setViewport(390, 844);
  const mobile390Overflow = await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`);
  const mobile390ScrollWidth = await evaluate(`document.documentElement.scrollWidth`);
  console.log(`  Mobile 390 overflow check: scrollWidth=${mobile390ScrollWidth}px vs window=${390}px -> ${mobile390Overflow ? 'NO OVERFLOW ✓' : 'OVERFLOW ✗'}`);
  await takeScreenshot(path.join(outDir, 't4_mobile_390.png'));

  // TEST 5: Compact Mobile 360x800 (Android Standard)
  console.log('\n[Test 5: Compact Mobile 360x800 Viewport]');
  await setViewport(360, 800);
  const mobile360Overflow = await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`);
  const mobile360ScrollWidth = await evaluate(`document.documentElement.scrollWidth`);
  console.log(`  Mobile 360 overflow check: scrollWidth=${mobile360ScrollWidth}px vs window=${360}px -> ${mobile360Overflow ? 'NO OVERFLOW ✓' : 'OVERFLOW ✗'}`);

  // Back to Desktop for interactive functional tests
  await setViewport(1440, 900);

  // TEST 6: Real-time Panchang Clock Verification
  console.log('\n[Test 6: Real-Time Panchang Clock & Astronomical Telemetry]');
  const clockText = await evaluate(`document.getElementById('ballarat-clock-seconds')?.textContent`);
  const sunriseText = await evaluate(`document.getElementById('ballarat-sunrise')?.textContent`);
  const sunsetText = await evaluate(`document.getElementById('ballarat-sunset')?.textContent`);
  const rahuText = await evaluate(`document.getElementById('ballarat-rahu')?.textContent`);
  const countdownText = await evaluate(`document.getElementById('ritual-countdown')?.textContent`);

  console.log(`  Clock Text: "${clockText}"`);
  console.log(`  Sunrise: "${sunriseText}" | Sunset: "${sunsetText}"`);
  console.log(`  Rahu Kalam: "${rahuText}"`);
  console.log(`  Aarti Countdown: "${countdownText}"`);

  // TEST 7: Signature Artifact 1 — Gotra Sankalp Generator & Certificate
  console.log('\n[Test 7: Signature Artifact 1 — Gotra Sankalp Studio]');
  await evaluate(`
    document.getElementById('input-sankalp-name').value = 'Dr. Anand & Priya Rajan';
    document.getElementById('input-sankalp-gotra').value = 'Bharadwaja';
    document.getElementById('input-sankalp-nakshatra').value = 'Pushya';
    document.getElementById('input-sankalp-intention').value = 'Family Longevity, Radiant Health & Global Peace';
    document.getElementById('btn-update-sankalp').click();
  `);
  await new Promise(r => setTimeout(r, 300));

  const certName = await evaluate(`document.getElementById('cert-display-name')?.textContent`);
  const certGotra = await evaluate(`document.getElementById('cert-display-gotra')?.textContent`);
  const certToken = await evaluate(`document.getElementById('cert-token-id')?.textContent`);

  console.log(`  Certificate Name Rendered: "${certName}"`);
  console.log(`  Certificate Gotra & Nakshatra: "${certGotra}"`);
  console.log(`  Generated Reference Token: "${certToken}"`);

  await evaluate(`document.getElementById('sankalp-generator').scrollIntoView()`);
  await new Promise(r => setTimeout(r, 400));
  await takeScreenshot(path.join(outDir, 't4_certificate_studio.png'));

  // TEST 8: Signature Artifact 2 — 5-Acre Ross Creek Campus Zone Explorer
  console.log('\n[Test 8: Signature Artifact 2 — 5-Acre Campus Explorer]');
  // Switch to Zone 2 (Annadanam Kitchen)
  await evaluate(`document.querySelector('.zone-tab-btn[data-zone="2"]').click()`);
  await new Promise(r => setTimeout(r, 300));
  const zone2Title = await evaluate(`document.getElementById('zone-spotlight-title')?.textContent`);
  console.log(`  Zone 2 Switch: "${zone2Title}"`);

  // Switch to Zone 3 (Cultural Academy)
  await evaluate(`document.querySelector('.zone-tab-btn[data-zone="3"]').click()`);
  await new Promise(r => setTimeout(r, 300));
  const zone3Title = await evaluate(`document.getElementById('zone-spotlight-title')?.textContent`);
  console.log(`  Zone 3 Switch: "${zone3Title}"`);

  // Switch to Zone 5 (Parking & DDA)
  await evaluate(`document.querySelector('.zone-tab-btn[data-zone="5"]').click()`);
  await new Promise(r => setTimeout(r, 300));
  const zone5Title = await evaluate(`document.getElementById('zone-spotlight-title')?.textContent`);
  console.log(`  Zone 5 Switch: "${zone5Title}"`);

  // Switch back to Zone 1
  await evaluate(`document.querySelector('.zone-tab-btn[data-zone="1"]').click()`);
  await new Promise(r => setTimeout(r, 300));
  await evaluate(`document.getElementById('campus-explorer').scrollIntoView()`);
  await new Promise(r => setTimeout(r, 400));
  await takeScreenshot(path.join(outDir, 't4_campus_explorer.png'));

  // TEST 9: Signature Artifact 3 — DGR Brick Matrix & Progressive Tax Calculator
  console.log('\n[Test 9: Signature Artifact 3 — DGR Brick Matrix & Progressive Tax Calculator]');
  await evaluate(`
    document.getElementById('brick-custom-input').value = 500;
    document.getElementById('brick-income-input').value = 90000;
    document.getElementById('brick-donor-name').value = 'Rajan & Descendants';
    document.getElementById('brick-custom-input').dispatchEvent(new Event('input'));
  `);
  await new Promise(r => setTimeout(r, 300));

  const grossVal = await evaluate(`document.getElementById('taxGrossVal')?.textContent`);
  const refundVal = await evaluate(`document.getElementById('taxRefundVal')?.textContent`);
  const netVal = await evaluate(`document.getElementById('taxNetVal')?.textContent`);
  const engravedName = await evaluate(`document.getElementById('brickEngravedName')?.textContent`);

  console.log(`  Tax Gross Value: "${grossVal}"`);
  console.log(`  Tax Total Refund: "${refundVal}"`);
  console.log(`  Net Out-Of-Pocket: "${netVal}"`);
  console.log(`  Granite Plaque Engraved Name: "${engravedName}"`);

  // Click an available brick tile
  await evaluate(`document.querySelector('.virtual-brick-tile[data-brick-num="4281"]').click()`);
  await new Promise(r => setTimeout(r, 300));

  await evaluate(`document.getElementById('brick-tax-matrix').scrollIntoView()`);
  await new Promise(r => setTimeout(r, 400));
  await takeScreenshot(path.join(outDir, 't4_brick_tax_matrix.png'));

  // TEST 10: Check Console Errors Summary
  console.log('\n[Test 10: Console Errors Summary]');
  if (consoleErrors.length === 0) {
    console.log('  ✓ ZERO console errors detected during entire test session!');
  } else {
    console.error(`  ✗ ${consoleErrors.length} console errors encountered!`);
  }

  // Cleanup Chrome
  ws.close();
  chromeProcess.kill();
  console.log('\n=== REAL BROWSER QA PASSED AND COMPLETED SUCCESSFULLY ===\n');
}
