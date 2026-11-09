import { get } from '@vercel/blob';

export default async function handler(req, res) {
  const pathname = req.query?.pathname || req.query?.path;

  if (!pathname) {
    return res.status(400).json({ error: 'Missing pathname query parameter' });
  }

  try {
    const result = await get(pathname, { access: 'private' });

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
