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
  const [authToken, setAuthToken] = useState('');
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [charactor2Data, setCharactor2Data] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      fetchPortfolioImages(token);
      fetchCharactor2(token);
    } else {
      console.error("인증 토큰이 없습니다.");
    }
  }, []);

  const fetchCharactor2 = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolios/charactor2', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Charactor2 정보를 가져오는 중 오류 발생');

      const data = await response.json();
      setCharactor2Data(data);
      console.log('Charactor2 데이터:', data);
    } catch (error) {
      console.error("Charactor2 정보를 가져오는 중 오류:", error);
    }
  };

  const addCharactor2 = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolios/charactor2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ charactor2: content }),
      });

      const result = await response.json();
      console.log('Charactor2 추가 성공:', result.message);
      alert(result.message);
      fetchCharactor2(authToken);
    } catch (error) {
      console.error("Charactor2 추가 중 오류:", error);
      alert("Charactor2 추가 중 오류가 발생했습니다.");
    }
  };

  const fetchPortfolioImages = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolios/portfolioImages2', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('이미지를 가져오는 중 오류 발생');

      const data = await response.json();
      setPortfolioImages(data);
      console.log('포트폴리오 이미지 데이터:', data);
    } catch (error) {
      console.error("포트폴리오 이미지를 가져오는 중 오류:", error);
    }
  };

  const uploadImages = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolios/portfolioImages2', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log('이미지 업로드 성공', result);
      alert(result.message);
    } catch (error) {
      console.error("이미지 업로드 중 오류:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
    if (files.length + photos.length > 10) {
      alert("최대 10장의 사진만 업로드할 수 있습니다.");
      return;
    }
    setPhotos([...photos, ...files]);
    setCurrentPhotoIndex(0);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
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
      formData.append('images', photo);
    });

    await uploadImages(formData);

    const newCard = { content, photos };
    setCards([...cards, newCard]);
    setContent('');
    setPhotos([]);
    setCurrentPhotoIndex(0);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex < photos.length - 1 ? prevIndex + 1 : 0));
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : photos.length - 1));
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
                Skill 칸에 자신의 재능에 대한 설명을 적으면<br />
                다른 사람들이 나와 거래할 때 도움이 됩니다.<br />
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
                <button onClick={addCharactor2}>cha 등록</button>
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
                  {charactor2Data && (
                    <div style={{ marginTop: '20px' }}>
                      <StyledH2>SKILL</StyledH2>
                      <p>{charactor2Data.charactor2}</p>
                    </div>
                  )}
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
                      style={{ height: '200px', margin: '5px' }}
                    />
                  ))
                ) : (
                  <span>포트폴리오 이미지가 없습니다.</span>
                )}
              </div>

              {charactor2Data && (
                    <div style={{ marginTop: '20px' }}>
                      <StyledH2>SKILL</StyledH2>
                      <p>{charactor2Data.charactor2}</p>
                    </div>
                  )}
            </Overlap>

          </OverlapWrapper>
          <BottomBox>
          <Footer />
        </BottomBox>
        </InnerDiv>
        
      </MyPageContainer>
    </BackgroundWrapper>
  );
};

export default NextPage;
