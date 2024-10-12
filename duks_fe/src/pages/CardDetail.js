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
  const [photos, setPhotos] = useState([]); // 사진을 저장할 상태
  const [contents, setContents] = useState([]); // 내용을 저장할 상태
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // 현재 사진 인덱스
  const [currentContent, setCurrentContent] = useState(''); // 현재 입력된 내용을 저장할 상태
  const [isEditingIndex, setIsEditingIndex] = useState(null); // 수정 중인 내용의 인덱스

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
    if (files.length + photos.length > 10) {
      alert("최대 10장의 사진만 업로드할 수 있습니다.");
      return;
    }
    setPhotos([...photos, ...files]);
    setContents([...contents, ...Array(files.length).fill('')]); // 새 사진의 내용 배열 초기화
    setCurrentPhotoIndex(0); // 사진 추가 후 첫 번째 사진으로 초기화
  };

  const handleContentChange = (event) => {
    setCurrentContent(event.target.value); // 현재 입력된 내용을 상태에 저장
  };

  const handleSubmit = () => {
    if (!currentContent) {
      alert("내용을 입력해 주세요.");
      return;
    }

    // 현재 사진 인덱스에 해당하는 내용 업데이트
    const updatedContents = [...contents];
    updatedContents[currentPhotoIndex] = currentContent; // 현재 내용 추가
    setContents(updatedContents); // 내용을 업데이트

    alert("등록되었습니다."); // 등록 완료 알림
    setCurrentContent(''); // 내용 초기화
    setIsEditingIndex(null); // 수정 모드 종료
  };

  const handleEdit = (index) => {
    setCurrentContent(contents[index]); // 선택한 내용을 현재 내용으로 설정
    setIsEditingIndex(index); // 수정 중인 인덱스 설정
    setCurrentPhotoIndex(index); // 해당 사진으로 이동
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
              <StyledTextArea 
                style={{ marginTop: '20px', border: '3px solid lightgray', padding: '25px' }}
                value={currentContent} 
                onChange={handleContentChange} 
                placeholder="내용을 입력하세요." 
                rows="4" 
              />
              <button onClick={handleSubmit}>{isEditingIndex !== null ? "수정" : "등록"}</button>

              {/* 모든 등록된 사진과 내용 렌더링 */}
              {contents.map((content, index) => (
                content && (
                  <div key={index} style={{ marginTop: '10px', border: '1px solid lightgray', padding: '10px' }}>
                    <p>{content}</p>
                    {photos[index] && ( // 사진이 존재하는 경우에만 렌더링
                      <img 
                        src={URL.createObjectURL(photos[index])} 
                        alt={`등록된 사진 ${index + 1}`} 
                        style={{ width: '150px', margin: '5px' }} 
                      />
                    )}
                    <button onClick={() => handleEdit(index)}>수정</button>
                  </div>
                )
              ))}
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
