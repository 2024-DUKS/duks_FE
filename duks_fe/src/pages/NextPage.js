import React, { useState, useEffect } from 'react';
import { 
  BackgroundWrapper, 
  MyPageContainer, 
  InnerDiv, 
  TopBox, 
  BottomBox, 
  OverlapWrapper, 
  Overlap, 
  StyledTextArea,
  PButton,
  NButton,
  CustomFileInput,
  CustomFileButton,
  StyledH2
} from '../styles/CardStyle';

import Footer from '../components/Footer';

const NextPage = () => {
  const [cards, setCards] = useState([]);
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [authToken, setAuthToken] = useState(''); // 인증 토큰
  const [portfolioImages, setPortfolioImages] = useState([]); // 포트폴리오 이미지 상태

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 authToken을 가져오고 포트폴리오 이미지를 조회함
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      fetchPortfolioImages(token); // 인증 토큰을 사용하여 포트폴리오 이미지 조회
    } else {
      console.error("인증 토큰이 없습니다."); // 토큰이 없을 경우 로그
    }
  }, []);

  // 포트폴리오 이미지 조회 함수
  const fetchPortfolioImages = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolios/portfolioImages2', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 JWT 토큰 추가
        },
      });

      if (!response.ok) {
        throw new Error('이미지를 가져오는 중 오류 발생');
      }

      const data = await response.json();
      setPortfolioImages(data); // 가져온 이미지를 상태에 설정
      console.log('포트폴리오 이미지 데이터:', data); // 디버깅용 로그
    } catch (error) {
      console.error("포트폴리오 이미지를 가져오는 중 오류:", error); // 에러 발생 시 로그 추가
    }
  };

  // 이미지 업로드 함수
  const uploadImages = async (userId, formData) => {
    try {
      console.log('이미지 업로드 시작'); // 디버깅용 로그 추가
      const response = await fetch(`http://localhost:5000/api/portfolios/portfolioImages2`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`, // 로컬 스토리지에서 가져온 JWT 토큰 사용
        },
        body: formData,
      });
      const result = await response.json();
      console.log('이미지 업로드 성공', result); // 디버깅용 로그 추가
      alert(result.message);
    } catch (error) {
      console.error("이미지 업로드 중 오류:", error); // 에러 발생 시 로그 추가
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  // 사진 추가 처리
  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
    console.log('선택된 파일:', files); // 디버깅용 로그 추가
    if (files.length + photos.length > 10) {
      alert("최대 10장의 사진만 업로드할 수 있습니다.");
      return;
    }
    setPhotos([...photos, ...files]);
    setCurrentPhotoIndex(0);
  };

  // 내용 입력 처리
  const handleContentChange = (event) => {
    setContent(event.target.value);
    console.log('입력된 내용:', event.target.value); // 디버깅용 로그 추가
  };

  // 카드 등록 처리
  const handleSubmit = async () => {
    console.log('카드 등록 시작'); // 디버깅용 로그 추가
    if (!content) {
      alert("내용을 입력해 주세요.");
      return;
    }
    if (photos.length === 0) {
      alert("최소 1장의 사진을 업로드해야 합니다.");
      return;
    }

    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append('images', photo); // form-data 형식으로 이미지 추가
    });

    const userId = 1; // 임의의 사용자 ID (백엔드에서 실제로 처리할 때는 JWT로부터 얻어야 함)
    console.log('이미지 업로드 중'); // 디버깅용 로그 추가
    await uploadImages(userId, formData); // 이미지 업로드 처리

    const newCard = { content, photos };
    console.log('새 카드 등록:', newCard); // 디버깅용 로그 추가
    setCards([...cards, newCard]);
    setContent('');
    setPhotos([]);
    setCurrentPhotoIndex(0);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex < photos.length - 1 ? prevIndex + 1 : 0
    );
    console.log('다음 사진으로 이동:', currentPhotoIndex); // 디버깅용 로그 추가
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : photos.length - 1
    );
    console.log('이전 사진으로 이동:', currentPhotoIndex); // 디버깅용 로그 추가
  };

  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox style={{ position: 'sticky', top: 0, zIndex: 1 }}></TopBox>

          <OverlapWrapper style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto'}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
              <div style={{
                textAlign: 'center',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0px 4px 4px #00000040',
                backgroundColor: '#f2f2f2',
                maxWidth: '300px',
                fontSize: '15px'
              }}>
                간단한 사진과 텍스트로<br />
                나의 재능을 뽐내보세요!<br />
                사진은 최대 10장까지 업로드됩니다.<br />
              </div>
            </div>

            <Overlap style={{ marginTop: '-180px' }}>
              <br />
              <StyledH2>PHOTO</StyledH2>
              <CustomFileButton>
                <CustomFileInput type="file" accept="image/*" multiple onChange={handlePhotoChange} />
              </CustomFileButton>

              <div style={{ overflowX: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {photos.length === 0 && (
                  <div style={{ width: '300px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc' }}>
                    <span>사진이 없습니다</span>
                  </div>
                )}

                {photos.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img 
                      src={URL.createObjectURL(photos[currentPhotoIndex])} 
                      alt={`사진 ${currentPhotoIndex + 1}`} 
                      style={{ height: '180px', margin: '5px', display: 'block' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <PButton onClick={handlePreviousPhoto}>이전</PButton>
                      <NButton onClick={handleNextPhoto}>다음</NButton>
                    </div>
                  </div>
                )}
              </div>

              <StyledH2>SKILL</StyledH2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <StyledTextArea 
                  style={{ marginTop: '20px', border: '1px dashed #ccc', width: '300px', height: '100px', textAlign: 'center' }}
                  value={content} 
                  onChange={handleContentChange} 
                  placeholder="내용을 입력하세요." 
                  rows="1"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                <button onClick={handleSubmit}>등록</button>
              </div>

            </Overlap>

            {cards.map((card, index) => (
              <Overlap key={index}> 
                <div style={{ border: '1px ', padding: '10px', marginTop: '10px' }}>
                  <StyledH2>PHOTO</StyledH2>
                  <div style={{ display: 'flex', overflowX: 'auto', justifyContent: 'center' }}>
                    {card.photos.map((photo, idx) => (
                      <img 
                        key={idx} 
                        src={URL.createObjectURL(photo)} // 여기에 이미지 URL 추가
                        alt={`등록된 사진 ${idx + 1}`} 
                        style={{ height: '80px', margin: '5px' }}
                      />
                    ))}
                  </div>
                  <StyledH2>SKILL</StyledH2>
                  <div>{card.content}</div>
                </div>
              </Overlap>
            ))}

            {/* 포트폴리오 이미지 랜더링 추가 */}
            <Overlap>
              <StyledH2>PHOTO</StyledH2>
              <div style={{ display: 'flex', overflowX: 'auto', justifyContent: 'center' }}>
                {portfolioImages.length > 0 ? (
                  portfolioImages.map((image, index) => (
                    <img 
                      key={index} 
                      src={`http://localhost:5000/${image.imagePath}`} // 포트폴리오 이미지 URL 
                      alt={`포트폴리오 이미지 ${index + 1}`} 
                      style={{ height: '80px', margin: '5px' }}
                    />
                  ))
                ) : (
                  <span>포트폴리오 이미지가 없습니다.</span>
                )}
              </div>
              
              <StyledH2>SKILL</StyledH2>
              <div>{}</div>
            </Overlap>


          </OverlapWrapper>
        </InnerDiv>
        <Footer />
      </MyPageContainer>
    </BackgroundWrapper>
  );
};

export default NextPage;
