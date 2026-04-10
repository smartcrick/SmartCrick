const formatFileSize = (size) => {
  if (!size) return "";
  if (size < 1024) return "<1 KB";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const PerformanceUploadStep = ({
  selectedFile,
  onFileChange,
  isComplete = false,
}) => {
  const hasFile = Boolean(selectedFile);

  return (
    <div className="performance-step">
      <div className="performance-step__hero-copy">
        <p className="performance-step__eyebrow">Step 5</p>
        <h2 className="performance-step__title">Attach the supporting video to this saved performance record.</h2>
        <p className="performance-step__description">
          The record is already saved. Add the session clip that gives the next review the right visual context.
        </p>
      </div>

      <div className="performance-upload-step">
        <div className={`performance-upload-dropzone${hasFile ? " has-file" : ""}${isComplete ? " is-complete" : ""}`}>
          <p className="performance-upload-dropzone__eyebrow">
            {isComplete ? "Upload complete" : hasFile ? "File selected" : "Video upload"}
          </p>
          <h3 className="performance-upload-dropzone__title">
            {isComplete ? "Performance video is attached and ready." : "Choose a session clip to attach to this record."}
          </h3>
          <p className="performance-upload-dropzone__description">
            MP4 or MOV files are a good fit here. Keep the clip focused on the sequence you want reviewed.
          </p>

          <label className="performance-upload-dropzone__control">
            <span>{hasFile ? "Replace file" : "Choose file"}</span>
            <input
              type="file"
              accept="video/*"
              onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
            />
          </label>

          {hasFile ? (
            <div className="performance-upload-dropzone__file">
              <strong>{selectedFile.name}</strong>
              <span>{formatFileSize(selectedFile.size)}</span>
            </div>
          ) : null}
        </div>

        <div className="performance-surface-card">
          <p className="performance-surface-card__label">Final step</p>
          <p className="performance-surface-card__copy">
            The performance record is already saved. Add the clip that supports this session, then use the action area
            below to attach it to the existing record.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceUploadStep;
