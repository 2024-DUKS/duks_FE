import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BackgroundWrapper, 
  MyPageContainer, 
  InnerDiv, 
  TopBox, 
  BottomBox, 
  OverlapWrapper, 
  Overlap, 
  TopLink, 
  StyledTextArea,
  PButton,
  NButton,
  CustomFileInput,
  CustomFileButton,
  StyledH2
} from '../styles/CardStyle';

import Footer from '../components/Footer';

const NextPage = () => {
  const [cards, setCards] = useState([]); // 카드 배열 상태
  const [content, setContent] = useState(''); // 현재 입력 중인 내용 상태
  const [photos, setPhotos] = useState([]); // 현재 선택한 사진 상태
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // 현재 사진 인덱스

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
    if (files.length + photos.length > 10) {
      alert("최대 10장의 사진만 업로드할 수 있습니다.");
      return;
    }
    setPhotos([...photos, ...files]);
    setCurrentPhotoIndex(0); // 사진 추가 후 첫 번째 사진으로 초기화
  };

  const handleContentChange = (event) => {
    setContent(event.target.value); // 입력된 내용을 상태에 저장
  };

  const handleSubmit = () => {
    if (!content) {
      alert("내용을 입력해 주세요.");
      return;
    }

    const newCard = { content, photos }; // 새로운 카드 객체 생성
    setCards([...cards, newCard]); // 카드 배열에 추가
    setContent(''); // 내용 초기화
    setPhotos([]); // 사진도 초기화
    setCurrentPhotoIndex(0); // 현재 사진 인덱스 초기화
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex < photos.length - 1 ? prevIndex + 1 : 0 // 마지막 사진이면 첫 번째 사진으로 돌아감
    );
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : photos.length - 1 // 첫 번째 사진이면 마지막 사진으로 돌아감
    );
  };

  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          {/* TopBox를 항상 화면 상단에 고정시키기 위해 position: sticky 적용 */}
          <TopBox style={{ position: 'sticky', top: 0, zIndex: 1 }}></TopBox>

          <OverlapWrapper style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto'}}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              padding: '20px' 
            }}>
              <div style={{
                textAlign: 'center', // 텍스트 가운데 정렬
                padding: '20px', // 내부 여백
                borderRadius: '8px', // 모서리 둥글게
                boxShadow: '0px 4px 4px #00000040', // 그림자 효과
                backgroundColor: '#f2f2f2',
                maxWidth: '300px', // 배경색
                fontSize: '15px' // 글자 크기 설정
              }}>
                간단한 사진과 텍스트로<br />
                나의 재능을 뽐내보세요!<br /><br />
                사진을 최대 10장까지 업로드됩니다.<br /><br />
                Skill 칸에 자신의 재능에 대한 설명을 적으면<br />
                다른 사람들이 나와 거래할 때 도움이 됩니다.<br />
              </div>
            </div>

            <Overlap style={{ marginTop: '-150px' }}> {/* 스크롤 가능하도록 스타일 추가 */}
              <br />
              <StyledH2>PHOTO</StyledH2>
              <CustomFileButton>
                <CustomFileInput type="file" accept="image/*" multiple onChange={handlePhotoChange} />
              </CustomFileButton>

              <div style={{ overflowX: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* 사진이 없을 경우 고정된 높이를 가진 빈 공간 */}
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
                      style={{ height: '180px', margin: '5px', display: 'block' }} // display: block 추가
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}> {/* 버튼 중앙 정렬 */}
                      <PButton onClick={handlePreviousPhoto}>이전</PButton>
                      <NButton onClick={handleNextPhoto}>다음</NButton>
                    </div>
                  </div>
                )}
              </div>

              <StyledH2>SKILL</StyledH2>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
              }}>
                <StyledTextArea 
                  style={{ marginTop: '20px', border: '1px dashed #ccc', width: '300px', height: '100px', textAlign: 'center' }} // 폭과 높이 설정
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

            {/* 등록된 카드 각각을 개별 Overlap으로 감쌈 */}
            {cards.map((card, index) => (
              <Overlap key={index}> 
                <div style={{ border: '1px ', padding: '10px', marginTop: '10px' }}>
                  <StyledH2>PHOTO</StyledH2>
                  <div style={{ overflowX: 'auto', display: 'flex' }}>
                    {card.photos.map((photo, photoIndex) => (
                      <img 
                        key={photoIndex} 
                        src={URL.createObjectURL(photo)} 
                        alt={`등록된 사진 ${photoIndex + 1}`} 
                        style={{ height: '180px', margin: '5px' }} 
                      />
                    ))}
                  </div>
                  <StyledH2>SKILL</StyledH2>
                  <p>{card.content}</p>
                </div>
              </Overlap>
            ))}
          </OverlapWrapper>

          <BottomBox>
            <Footer></Footer>
          </BottomBox>
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
}

export default NextPage;
