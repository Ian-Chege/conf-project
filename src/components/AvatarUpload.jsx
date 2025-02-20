import { useState, useCallback, useRef } from "react";

import "./AvatarUpload.css";

const MAX_FILE_SIZE = 10000 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

function AvatarUpload({ onImageUpload }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!file) return "Please select an image file.";
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please upload a JPG or PNG image.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Image must be less than 10MB.";
    }
    return null;
  };

  const processImage = useCallback(async (file) => {
    setIsLoading(true);
    setError(null);

    try {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Read file as Data URL for upload
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e.target.result);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setError("Failed to process image. Please try again.");
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  }, [onImageUpload]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processImage(file);
    }
  }, [processImage]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  }, [processImage]);

  const handleRemoveImage = useCallback((e) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageUpload(null);
  }, [onImageUpload, fileInputRef]);

  return (
    <div className="avatar-uploader">
      <div
        className={`avatar-drop-zone ${isDragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {isLoading ? (
          <div className="upload-loader">
            <div className="spinner"></div>
            <span>Processing...</span>
          </div>
        ) : preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <button 
              className="remove-image" 
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="upload-prompt">
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="upload-text">
              <span className="primary-text">Click to upload</span>
              <span className="secondary-text">or drag and drop</span>
            </p>
            <p className="file-info">JPG or PNG, max 10MB</p>
          </div>
        )}
      </div>
      
      {error && <div className="error-message" role="alert">{error}</div>}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFileChange}
        className="file-input"
        aria-label="Upload image"
      />
    </div>
  );
}

export default AvatarUpload;
