import React, { useState } from 'react';

function AvatarUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result); 
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-upload">
      <h2>Upload Avatar</h2>
      <div> 
        {selectedImage ? (
          <img src={selectedImage} alt="Preview" style={{ width: '100%', height: 'auto' }} /> 
        ) : (
          <>
            <img src="/placeholder.png" alt="Upload Avatar" /> 
            <p>Drag and drop or click to upload</p> 
          </>
        )}
      </div>
      <input 
        type="file" 
        id="avatar-input" 
        accept="image/*" 
        onChange={handleImageChange} 
        style={{ display: 'none' }} 
      />
    </div>
  );
}

export default AvatarUpload;