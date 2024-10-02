// ImageUploader.js
import './ImageUpLoader.css';
import React, { useState } from 'react';

const ImageUploader = ({ defaultImage, className }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(file);
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleDefaultImageClick = () => {
      document.getElementById('image-input').click();
    };
  
    return (
      <div>
        <div className={`image-preview ${className}`} onClick={handleDefaultImageClick}>
          <img 
            src={imagePreview || defaultImage} // 기본 이미지 props로 받기
            alt="Preview" 
            className="circle-image" 
          />
        </div>
        <input 
          type="file" 
          id="image-input" 
          accept="image/*" 
          onChange={handleImageChange} 
          style={{ display: 'none' }} // 파일 입력 숨김
        />
      </div>
    );
};

export default ImageUploader;
