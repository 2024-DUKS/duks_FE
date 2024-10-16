import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileImageUploader = () => {
  const [image, setImage] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState('');

  const token = localStorage.getItem('authToken');

  useEffect(() => {
   
    if (token) {
      setAuthToken(token);
    } else {
      setUploadError('인증 토큰이 없습니다.');
    }
  }, []);
  
  useEffect(() => {
    const fetchUserImage = async () => {
      if (authToken) {
        console.log('Fetching user image...');
        try {
          const response = await axios.get('http://localhost:5000/api/portfolios/folioImg', {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          });
          const imagePath = response.data.imagePath.replace(/\\/g, '/');
          const absoluteImagePath = `http://localhost:5000/${imagePath}`;
          setImage(absoluteImagePath);
        } catch (error) {
          console.error(error);
          setUploadError('이미지를 불러오는 중 오류가 발생했습니다.');
        }
      }
    };
    fetchUserImage();
  }, [authToken]);
  

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('파일 크기가 너무 큽니다. 5MB 이하의 파일을 선택해주세요.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('image', file);

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/portfolios/folioImg', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`,
          }
        });

        const imagePath = response.data.imagePath.replace(/\\/g, '/');
        const absoluteImagePath = `http://localhost:5000/${imagePath}`;
        setImage(absoluteImagePath);
        setUploadError('');
      } catch (error) {
        const errorMessage = error.response?.data?.message || '이미지 업로드 중 오류가 발생했습니다.';
        setUploadError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={styles.container}>
      <label htmlFor="fileInput">
        <div style={styles.circle}>
          {image ? (
            <img src={image} alt="프로필 이미지" style={styles.image} />
          ) : (
            <span style={styles.text}>갤러리에서 사진을 선택해주세요</span>
          )}
        </div>
      </label>

      <input 
        id="fileInput" 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        style={styles.fileInput} 
      />

      {loading && <p style={styles.loading}>업로드 중...</p>}
      {uploadError && <p style={styles.error}>{uploadError}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '20px',
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
    marginBottom: '10px',
    border: '5px solid #ccc',
  },
  text: {
    color: '#777',
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
    display: 'none',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  loading: {
    color: 'blue',
    marginTop: '10px',
  },
};

export default ProfileImageUploader;
