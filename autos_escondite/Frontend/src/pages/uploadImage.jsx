import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedImage) {
        console.error('Please select an image before uploading.');
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Image uploaded. Image URL:', data.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
