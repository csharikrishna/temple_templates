import { head } from '@vercel/blob';

export default async function handler(req, res) {
  const pathname = req.query?.pathname || req.query?.path;

  if (!pathname) {
    return res.status(400).json({ error: 'Missing pathname query parameter' });
  }

  try {
    const meta = await head(pathname);
    if (!meta || !meta.url) {
      return res.status(404).send('File not found in blob storage');
    }
    return res.redirect(307, meta.url);
  } catch (error) {
    console.error('Blob view error:', error);
    return res.status(500).json({ error: error.message || 'Error retrieving blob' });
  }
}
