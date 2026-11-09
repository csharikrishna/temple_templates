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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    let data = req.body;
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {}
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const savedFiles = [];

    // Helper for safe blob put (tries private first to match temple-templates-blob, falls back to public)
    async function safePut(path, content, options = {}) {
      try {
        return await put(path, content, { access: 'private', ...options });
      } catch (err) {
        if (err.message && err.message.includes('allow private access')) {
          return await put(path, content, { access: 'public', ...options });
        }
        throw err;
      }
    }

    // Process attached files if present
    if (data && Array.isArray(data.attached_files)) {
      for (const f of data.attached_files) {
        const fname = f.name || 'file';
        let b64 = f.dataUrl || '';
        let contentType = 'application/octet-stream';

        if (b64.startsWith('data:')) {
          const match = b64.match(/^data:([^;]+);base64,/);
          if (match) {
            contentType = match[1];
            b64 = b64.substring(match[0].length);
          }
        }

        try {
          const fileBuffer = Buffer.from(b64, 'base64');
          const cleanName = fname.replace(/[^a-zA-Z0-9._-]/g, '_');
          const blobPath = `bhtcc/files/${timestamp}_${cleanName}`;

          const blobResult = await safePut(blobPath, fileBuffer, {
            contentType: contentType
          });

          // Create viewer URL for easy browser access
          const viewUrl = `/api/view?pathname=${encodeURIComponent(blobResult.pathname)}`;

          savedFiles.push({
            name: fname,
            fieldKey: f.fieldKey || null,
            source: f.source || 'attachment',
            url: blobResult.url,
            viewUrl: viewUrl,
            pathname: blobResult.pathname
          });

          // Link to response if it was an in-card field attachment
          if (f.fieldKey && data.responses && data.responses[f.fieldKey]) {
            data.responses[f.fieldKey].blobPath = blobResult.pathname;
            data.responses[f.fieldKey].viewUrl = viewUrl;
          }
        } catch (uploadErr) {
          console.error(`Error uploading file ${fname}:`, uploadErr);
        }
      }
    }

    // Save cleaned submission metadata JSON to Blob
    const cleanSubmission = {
      ...data,
      server_saved_at: new Date().toISOString(),
      saved_files: savedFiles
    };

    // Remove raw base64 data to keep JSON tiny and fast
    delete cleanSubmission.attached_files;

    let submissionUrl = '';
    let submissionViewUrl = '';
    try {
      const submissionBlob = await safePut(
        `bhtcc/submissions/submission_${timestamp}.json`,
        JSON.stringify(cleanSubmission, null, 2),
        { contentType: 'application/json' }
      );
      submissionUrl = submissionBlob.url;
      submissionViewUrl = `/api/view?pathname=${encodeURIComponent(submissionBlob.pathname)}`;
    } catch (subErr) {
      console.warn('Could not save submission json to blob:', subErr.message);
    }

    return res.status(200).json({
      status: 'success',
      message: 'All answers and artwork saved permanently to Vercel Blob!',
      submission_file: submissionBlob?.pathname || `submission_${timestamp}.json`,
      submission_url: submissionUrl,
      submission_view_url: submissionViewUrl,
      files_count: savedFiles.length,
      saved_files: savedFiles
    });

  } catch (error) {
    console.error('Save intake error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to save intake to Vercel Blob'
    });
  }
}
