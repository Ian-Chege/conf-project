import { useState, useCallback } from "react";
import "./AvatarUpload.css";

const MAX_FILE_SIZE = 5000 * 1024; // 5000KB/5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

function AvatarUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file) => {
    if (!file) return "Please select an image file.";
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please upload a valid image file (JPG or PNG).";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB.";
    }
    return null;
  };

  const handleImageChange = (file) => {
    setError(null);
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.onerror = () => {
      setError("Error reading file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleImageChange(file);
  };

  return (
    <div className="avatar-upload">
      {/* <h2>Upload Avatar</h2> */}
      <div
        className={`upload-area ${isDragging ? "dragging" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById("avatar-input").click()}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Preview" className="preview-image" />
        ) : (
          <>
            <div className="upload-icon">
              <img src="/assets/images/icon-upload.svg" alt="Upload Icon" />
            </div>
            <p>Drag and drop or click to upload</p>
          </>
        )}
      </div>
      <div className="file-info">
        Upload your photo (JPG or PNG, max size: 5MB).
      </div>
      {error && <div className="error-message">{error}</div>}
      <input
        type="file"
        id="avatar-input"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default AvatarUpload;
