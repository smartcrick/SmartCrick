import { useState } from "react";

import { usePerformancePersistence } from "../../hooks/usePerformancePersistence";

const VideoUpload = ({ performanceId }) => {
  const { uploadVideo, isSaving, error } = usePerformancePersistence();
  const [video, setVideo] = useState(null);

  const upload = async () => {
    await uploadVideo(performanceId, video);

    alert("All Done!");
  };

  return (
    <div>
      <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
      {error && <p>{error}</p>}
      <button onClick={upload} disabled={isSaving}>
        {isSaving ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default VideoUpload;
