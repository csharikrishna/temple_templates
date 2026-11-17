import { list } from '@vercel/blob';

export default async function handler(req, res) {
  const target = req.query?.url || req.query?.pathname || req.query?.path;

  if (!target) {
    return res.status(400).json({ error: 'Missing url or pathname query parameter' });
  }

  try {
    if (target.startsWith('http://') || target.startsWith('https://')) {
      return res.redirect(307, target);
    }

    // Lookup matching blob in the store by prefix/pathname
    const listing = await list({ prefix: target });
    if (listing && listing.blobs && listing.blobs.length > 0) {
      return res.redirect(307, listing.blobs[0].url);
    }

    // Fallback directory search
    const cleanPrefix = target.split('/').slice(0, -1).join('/');
    const allInDir = await list({ prefix: cleanPrefix });
    const match = allInDir.blobs.find(b => b.pathname.includes(target) || target.includes(b.pathname));
    if (match) {
      return res.redirect(307, match.url);
    }

    return res.status(404).send('File not found in blob storage');
  } catch (error) {
    console.error('Blob view error:', error);
    return res.status(500).json({ error: error.message || 'Error retrieving blob' });
  }
}
