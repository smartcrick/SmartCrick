import React, { useState } from "react";
import API from "../../api/api";

const VideoUpload = ({ performanceId }) => {
  const [video, setVideo] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("performance", performanceId);

    await API.post("videos/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("All Done!");
  };

  return (
    <div>
      <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
};

export default VideoUpload;