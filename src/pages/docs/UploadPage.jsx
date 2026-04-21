import React, { useState } from 'react';
import { Upload, CheckCircle2, Film, Image } from 'lucide-react';

const UploadPage = () => {
  const [uploadType, setUploadType] = useState('photo');

  const examples = {
    photo: {
      title: 'Upload a Photo',
      endpoint: 'POST /v25.0/{page-id}/photos',
      code: `curl -X POST "https://graph.facebook.com/v25.0/{page-id}/photos" \\
  -F "url=https://example.com/photo.jpg" \\
  -F "caption=My awesome photo!" \\
  -F "access_token=YOUR_TOKEN"`,
      response: `{
  "id": "10158023485671234",
  "post_id": "10158023485671234_10158023485671235"
}`,
    },
    video: {
      title: 'Upload a Video',
      endpoint: 'POST /v25.0/{page-id}/videos',
      code: `# Step 1: Start resumable upload session
curl -X POST "https://graph.facebook.com/v25.0/{page-id}/videos" \\
  -F "upload_phase=start" \\
  -F "file_size=26891001" \\
  -F "access_token=YOUR_TOKEN"

# Step 2: Transfer chunks
curl -X POST "https://graph-video.facebook.com/v25.0/{page-id}/videos" \\
  -F "upload_phase=transfer" \\
  -F "upload_session_id=SESSION_ID" \\
  -F "video_file_chunk=@chunk1.mp4" \\
  -F "access_token=YOUR_TOKEN"`,
      response: `{
  "video_id": "9832745672341234",
  "success": true
}`,
    },
  };

  const ex = examples[uploadType];

  return (
    <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3 mb-2">
          <Upload className="text-orange-500" size={28} />
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Upload a File or Video</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          The Graph API supports photo and video publishing to Pages, Groups, and personal profiles. Large video files use a resumable upload protocol.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex bg-gray-100 dark:bg-dark-bg rounded-xl p-1 w-fit gap-1">
        {[
          { key: 'photo', label: 'Photo', icon: Image },
          { key: 'video', label: 'Video', icon: Film },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setUploadType(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${uploadType === key ? 'bg-white dark:bg-dark-card shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-1 dark:text-white">{ex.title}</h2>
        <code className="text-facebook-blue font-mono text-sm">{ex.endpoint}</code>
        <div className="mt-5 space-y-4">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Request</div>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto whitespace-pre">{ex.code}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Response</div>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 overflow-x-auto">{ex.response}</div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Upload Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Photo formats', value: 'JPEG, BMP, PNG, GIF, TIFF' },
            { label: 'Max photo size', value: '10 MB' },
            { label: 'Video formats', value: 'MP4, MOV, AVI, MKV' },
            { label: 'Max video size', value: '10 GB' },
            { label: 'Max video duration', value: '240 minutes' },
            { label: 'Min video resolution', value: '120 x 120px' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">{label}:</span>
              <span className="font-semibold dark:text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
