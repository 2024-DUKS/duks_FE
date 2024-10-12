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
  CustomFileButton, StyledH2
} from '../styles/CardStyle'; // 수정된 스타일 임포트

import Footer from '../components/Footer';

const NextPage = () => {
  const [photos, setPhotos] = useState([]); // 사진을 저장할 상태
  const [content, setContent] = useState(''); // 내용을 저장할 상태
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // 현재 사진 인덱스
  const [submittedContent, setSubmittedContent] = useState(null); // 제출된 내용을 저장할 상태

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
    
    // 여기에 내용을 등록하는 로직을 추가할 수 있습니다.
    setSubmittedContent(content); // 제출된 내용을 상태에 저장
    alert("등록되었습니다."); // 등록 완료 알림
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
          <TopBox></TopBox>
          <TopLink><Link to="../Card">명함 페이지로 돌아가기</Link></TopLink>
          <OverlapWrapper>
            <Overlap>
            <br></br>
            <StyledH2>PHOTO</StyledH2>
              <CustomFileButton>
                <CustomFileInput type="file" accept="image/*" multiple onChange={handlePhotoChange} />
              </CustomFileButton>

              <div>
                {photos.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img 
                      src={URL.createObjectURL(photos[currentPhotoIndex])} 
                      alt={`사진 ${currentPhotoIndex + 1}`} 
                      style={{ width: '300px', margin: '5px', alignItems: 'center' }} 
                    />
                    <div>
                    <PButton onClick={handlePreviousPhoto}>이전</PButton>
                    <NButton onClick={handleNextPhoto}>다음</NButton>
                    </div>
                  </div>
                )}
              </div>

              <StyledH2>SKILL</StyledH2>

              {/* 내용 입력 영역이 제출된 내용이 없을 때만 보이도록 조건부 렌더링 */}
              {submittedContent === null ? (
                <>
                  <StyledTextArea 
                    style={{ marginTop: '20px', border: '3px solid lightgray', padding: '25px' }}
                    value={content} 
                    onChange={handleContentChange} 
                    placeholder="내용을 입력하세요." 
                    rows="4" 
                  />
                  <button onClick={handleSubmit}>등록</button>
                </>
              ) : (
                <div style={{ marginTop: '0px', border: '3px', padding: '25px' }}>
                  <p>{submittedContent}</p> {/* 등록된 내용 표시 */}
                </div>
              )}
            </Overlap>
          </OverlapWrapper>

          <BottomBox>
            <Footer>푸터 내용</Footer>
          </BottomBox>
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
}

export default NextPage;
