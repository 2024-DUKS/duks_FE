import React, { useState } from 'react';

const ProfileImageUploader = () => {
  const [image, setImage] = useState(null);

  // 이미지가 업로드되었을 때 처리하는 함수
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // 이미지를 미리보기로 설정
      };
      reader.readAsDataURL(file);  // 파일을 base64로 읽음
    }
  };

  return (
    <div style={styles.container}>
      <label htmlFor="fileInput">
        <div style={styles.circle}>
          {image ? (<img src={image} alt="프로필 이미지" style={styles.image} />) 
          : ( <span style={styles.text}>갤러리에서 사진을 선택해주세요</span> )}
        </div>
      </label>

      <input id="fileInput" type="file" accept="image/*" 
        onChange={handleImageUpload}style={styles.fileInput}/>
    </div>
  );
};

// 스타일 정의
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  circle: {
    width: '190px',
    height: '190px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    marginTop: '20px',
    border: '5px solid #ccc'
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '16px',
    padding: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',

  },
  fileInput: {
    display: 'none', // 파일 입력 필드를 숨김
  },
};

export default ProfileImageUploader;
