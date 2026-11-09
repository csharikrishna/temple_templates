import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb'
    }
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {}
    }

    const fname = body.name || 'file';
    let b64 = body.dataUrl || '';
    let contentType = body.type || 'application/octet-stream';

    if (b64.startsWith('data:')) {
      const match = b64.match(/^data:([^;]+);base64,/);
      if (match) {
        contentType = match[1];
        b64 = b64.substring(match[0].length);
      }
    }

    const fileBuffer = Buffer.from(b64, 'base64');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const cleanName = fname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const blobPath = `bhtcc/uploads/${timestamp}_${cleanName}`;

    let blobResult;
    try {
      blobResult = await put(blobPath, fileBuffer, {
        access: 'private',
        contentType: contentType
      });
    } catch (err) {
      if (err.message && err.message.includes('allow private access')) {
        blobResult = await put(blobPath, fileBuffer, {
          access: 'public',
          contentType: contentType
        });
      } else {
        throw err;
      }
    }

    const viewUrl = `/api/view?pathname=${encodeURIComponent(blobResult.pathname)}`;

    return res.status(200).json({
      status: 'success',
      pathname: blobResult.pathname,
      url: blobResult.url,
      viewUrl: viewUrl,
      name: fname,
      size: (fileBuffer.length / (1024 * 1024)).toFixed(2) + ' MB'
    });

  } catch (error) {
    console.error('File upload error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to upload to Vercel Blob'
    });
  }
}
