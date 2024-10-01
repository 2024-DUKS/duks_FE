//프로필 이미지 업로드 해주는 컴포넌트 (명함 이미지랑 다른 거임!! 댓글 쓸 때 쓰는 프사)
import './ImageUpLoader.css';
import React, { useState } from 'react';
const ImageUploader = () => {
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
        <div className="image-preview" onClick={handleDefaultImageClick}>
          <img 
            src={imagePreview || require('../img/duk_img.png')} // 기본 이미지
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

