import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileImageUploader = () => {
  // 상태 변수 선언
  const [image, setImage] = useState(null); // 업로드된 이미지 URL
  const [uploadError, setUploadError] = useState(''); // 업로드 오류 메시지
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [authToken, setAuthToken] = useState(''); // 인증 토큰

  // 로컬 스토리지에서 토큰을 가져오는 useEffect
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token); // 상태에 토큰 설정
    }
  }, []);

  // 사용자 이미지를 가져오는 함수
  useEffect(() => {
    const fetchUserImage = async () => {
      if (authToken) {
        console.log('사용자 이미지를 가져오는 중, 토큰:', authToken);

        const url = 'http://localhost:5000/api/portfolios/folioImg';
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // 수정된 부분: authToken 사용
        };
        console.log('요청 URL:', url);
        console.log('요청 헤더:', headers);



        try {
          const response = await axios.get(url, { headers });
          console.log('API 응답:', response.data); // API 응답 로깅

          // 응답에서 이미지 경로가 존재하는지 확인
          if (response.data && response.data.imagePath) {
            const imagePath = response.data.imagePath.replace(/\\/g, '/');
            const absoluteImagePath = `http://localhost:5000/${imagePath}`;
            setImage(absoluteImagePath); // 상태 업데이트
            console.log('사용자 이미지 경로:', absoluteImagePath);
          } else {
            console.error('imagePath가 응답에 없습니다:', response.data);
            setUploadError('이미지가 존재하지 않습니다.');
          }
        } catch (error) {
          if (error.response) {
            console.error('API 오류 응답:', error.response.data);
          } else {
            console.error('이미지 불러오기 중 오류:', error.message);
          }
          setUploadError('');
        }
      }
    };

    fetchUserImage(); // 이미지 가져오기 함수 호출
  }, [authToken]);

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // 선택된 파일 가져오기
    if (file) {
      console.log('업로드할 파일:', file);

      // 파일 크기 검사
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('파일 크기가 너무 큽니다. 5MB 이하의 파일을 선택해주세요.');
        console.warn('파일 크기 초과:', file.size);
        return;
      }

      // 파일 미리보기 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // 미리보기 이미지 상태 업데이트
        console.log('미리보기 이미지:', reader.result);
      };
      reader.readAsDataURL(file); // 파일 읽기

      // FormData 객체 생성 및 이미지 파일 추가
      const formData = new FormData();
      formData.append('image', file);

      try {
        setLoading(true); // 로딩 시작
        console.log('이미지 업로드 요청 중...');
        const response = await axios.post('http://localhost:5000/api/portfolios/folioImg', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        console.log('업로드 응답:', response.data); // 업로드 응답 로깅

        // 응답에서 이미지 경로 추출
        const imagePath = response.data.imagePath.replace(/\\/g, '/');
        const absoluteImagePath = `http://localhost:5000/${imagePath}`;
        setImage(absoluteImagePath); // 상태 업데이트
        setUploadError(''); // 오류 메시지 초기화
        console.log('업로드 완료된 이미지 경로:', absoluteImagePath);
      } catch (error) {
        const errorMessage = error.response?.data?.message || '이미지 업로드 중 오류가 발생했습니다.';
        setUploadError(errorMessage); // 오류 메시지 설정
        console.error('이미지 업로드 중 오류:', errorMessage);
      } finally {
        setLoading(false); // 로딩 종료
      }
    }
  };

  // 이미지 제거 핸들러
  const handleImageRemove = () => {
    setImage(null); // 이미지 상태 초기화
    console.log('이미지가 제거되었습니다.');
  };

  return (
    <div style={styles.container}>
      <label htmlFor="fileInput">
        <div style={styles.circle}>
          {image ? (
            <>
              <img src={image} alt="프로필 이미지" style={styles.image} />
            </>
          ) : (
            <span style={styles.text}>갤러리에서 사진을 선택해주세요</span>
          )}
        </div>
      </label>

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload} // 이미지 업로드 핸들러 연결
        style={styles.fileInput}
        disabled={loading}  // 로딩 중에는 입력 비활성화
      />

      {loading && <p style={styles.loading}>업로드 중...</p>}
      {uploadError && <p style={styles.error}>{uploadError}</p>}
    </div>
  );
};

// 스타일 객체
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
  removeButton: {
    marginTop: '10px',
    cursor: 'pointer',
    color: 'red',
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
