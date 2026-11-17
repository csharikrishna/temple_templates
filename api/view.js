import { get, head } from '@vercel/blob';

export default async function handler(req, res) {
  const pathname = req.query?.pathname || req.query?.path;

  if (!pathname) {
    return res.status(400).json({ error: 'Missing pathname query parameter' });
  }

  try {
    let result;
    try {
      result = await get(pathname, { access: 'public' });
    } catch (err1) {
      try {
        result = await get(pathname, { access: 'private' });
      } catch (err2) {
        // Fallback: try head to get direct public url and redirect
        const meta = await head(pathname);
        if (meta && meta.url) {
          return res.redirect(307, meta.url);
        }
        throw err1;
      }
    }

    if (!result || result.statusCode !== 200) {
      return res.status(404).send('File not found in blob storage');
    }

    res.setHeader('Content-Type', result.blob.contentType || 'application/octet-stream');
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const buffer = Buffer.from(await result.blob.arrayBuffer());
    return res.status(200).send(buffer);
  } catch (error) {
    console.error('Blob view error:', error);
    return res.status(500).json({ error: error.message || 'Error retrieving blob' });
  }
}
