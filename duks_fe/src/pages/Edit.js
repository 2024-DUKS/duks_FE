import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigate 함수 불러오기
import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, BottomBox, CloseButton, Title, SectionTitleWrapper, SectionTitle, SectionTitle1, PriceHint, TradeOptionWrapper, TradeOptionButton, DropdownWrapper, Dropdown, FileInputWrapper, FileInputLabel, FileInput, FileCount, ImagePreviewWrapper, ImagePreview, DeleteButtonWrapper, DeleteButton, InputWrapper, TextInput, PriceInput, PriceMessage, TextArea, SubmitButton
} from '../styles/EditStyle';

import Footer from '../components/Footer'
import axios from 'axios';

const Edit = () => {
  const navigate = useNavigate(); // useNavigate 함수 사용
  const [selectedOption, setSelectedOption] = useState('해드립니다'); // 기본 값 '해드립니다'로 설정
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 계열 관리
  const [selectedFiles, setSelectedFiles] = useState([]); // 첨부된 파일 배열
  const [title, setTitle] = useState(''); // 제목 상태
  const [price, setPrice] = useState(''); // 가격 상태
  const [priceMessage, setPriceMessage] = useState(''); // 가격 메시지
  const [description, setDescription] = useState(''); // 상세 설명 상태 추가

  const handleBack = () => {
    navigate(-1); // 뒤로 가기 기능
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option); // 버튼 클릭 시 선택된 옵션 상태 변경
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // 드롭다운 선택 시 상태 업데이트
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 10) {
      alert("최대 10장까지 첨부할 수 있습니다.");
      return;
    }
  
    const newFiles = files.map(file => ({
      file,  // 실제 파일 객체
      preview: URL.createObjectURL(file)  // 미리보기 URL 생성
    }));
  
    setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);  // 미리보기 URL과 함께 파일 저장
  };
  
  

  const handleDelete = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles); // 선택된 파일 배열에서 삭제
  }

  const handlePriceChange = (e) => {
    const value = e.target.value;

    // 숫자만 입력 가능
    if (/^\d*$/.test(value)) { 
      setPrice(value); // 입력한 값 그대로 저장
    }
};

const handleKeyDown = (e) => {
    // 백스페이스를 누르면 가격 입력이 '0'일 경우 값을 지우도록 설정
    if (price === '0' && e.key === 'Backspace') {
        setPrice(''); // 백스페이스로 '0'을 지울 때 빈 문자열로 설정
    }
};

const displayedPrice = price === '0' ? '' : price; // 입력된 값이 0이면 화면에서는 빈 값으로 표시
const displayedPlaceholder = price === '0' ? '재능 기부' : '희망 가격을 입력해주세요'; // 0일 경우 재능 기부로 표시
const isTalentDonation = price === '0'; // 재능 기부인지 확인하는 변수

const renderImagePreviews = () => {
  return selectedFiles.map((fileObj, index) => (
    <DeleteButtonWrapper key={index}>
      <ImagePreview src={fileObj.preview} alt={`preview-${index}`} />
      <DeleteButton onClick={() => handleDelete(index)}>X</DeleteButton>
    </DeleteButtonWrapper>
  ));
};


  // 현재 시간을 가져오는 함수
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString(); // 년-월-일 시:분:초 형식으로 반환
  };

  // 게시물 작성 버튼 클릭 시 데이터 처리 함수
  const handleSubmit = async () => {
    const postData = new FormData();
    postData.append('title', title);              // 게시물 제목
    postData.append('content', description);      // 게시물 내용
    postData.append('price', price);              // 가격
    postData.append('category', selectedCategory);// 선택된 카테고리
    postData.append('type', selectedOption);      // 해드립니다 / 해주세요 선택
  
    // 이미지 파일들을 FormData에 추가 (파일 객체만 전송)
    selectedFiles.forEach((fileObj) => {
      postData.append('images', fileObj.file);  // 파일 객체를 추가
    });
  
    const token = localStorage.getItem('authToken');
  
    try {
      const response = await axios.post('http://localhost:5000/api/posts/create', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("게시글이 성공적으로 작성되었습니다:", response.data);
      navigate('/main');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };
  
  useEffect(() => {
    return () => {
      selectedFiles.forEach(fileObj => URL.revokeObjectURL(fileObj.preview));  // 메모리 해제
    };
  }, [selectedFiles]);
  
  


  return (
    <div className="edit-page-wrapper">
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox>
            <CloseButton onClick={handleBack}>X</CloseButton> {/* X 버튼 클릭 시 handleBack 함수 호출 */}
            <Title>게시물 작성</Title> {/* 중앙에 제목 */}
          </TopBox>

          <SectionTitle1>거래 제안</SectionTitle1> {/* 거래 제안 제목 추가 */}

          <TradeOptionWrapper>
            <TradeOptionButton 
              selected={selectedOption === '해드립니다'} 
              onClick={() => handleOptionClick('해드립니다')}
            >
              해드립니다
            </TradeOptionButton>
            <TradeOptionButton 
              selected={selectedOption === '해주세요'} 
              onClick={() => handleOptionClick('해주세요')}
            >
              해주세요
            </TradeOptionButton>
          </TradeOptionWrapper>

          <SectionTitle>계열</SectionTitle> {/* 계열 제목 추가 */}
          <DropdownWrapper>
            <Dropdown value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">계열을 선택하세요</option>
              <option value="인문학 계열">인문학 계열</option>
              <option value="사회과학 계열">사회과학 계열</option>
              <option value="경영/경제 계열">경영/경제 계열</option>
              <option value="자연과학 계열">자연과학 계열</option>
              <option value="IT 계열">IT 계열</option>
              <option value="바이오/약학 계열">바이오/약학 계열</option>
              <option value="아트/디자인 계열">아트/디자인 계열</option>
              <option value="교육 계열">교육 계열</option>
            </Dropdown>
          </DropdownWrapper>

          <SectionTitle>상세 사진</SectionTitle>
<div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}> {/* 왼쪽 정렬 및 위치 고정 */}
  <FileInputWrapper>
    <FileInputLabel htmlFor="fileUpload">파일 첨부</FileInputLabel>
    <FileInput 
      id="fileUpload" 
      type="file" 
      multiple 
      accept="image/*" 
      onChange={handleFileChange}
    />
    <FileCount>{selectedFiles.length} / 10</FileCount> {/* 첨부된 파일 수 표시 */}
  </FileInputWrapper>

  <ImagePreviewWrapper>
    {renderImagePreviews()} {/* 첨부된 이미지 미리보기 */}
  </ImagePreviewWrapper>
</div>



          <SectionTitle>제목</SectionTitle> {/* 제목 섹션 */}
          <InputWrapper>
            <TextInput 
              type="text" 
              placeholder="제목을 입력해주세요" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </InputWrapper>

          <SectionTitleWrapper>
            <SectionTitle>가격</SectionTitle> {/* 가격 섹션 */}
            <PriceHint>재능기부면 0을 입력해주세요</PriceHint> {/* 가격 힌트 메시지 */}
          </SectionTitleWrapper>

          <InputWrapper>
            <PriceInput 
              type="text" 
              placeholder={displayedPlaceholder} // 0일 경우 '재능 기부' 표시
              value={displayedPrice}  // 0일 경우 '재능 기부'로 표시 
              onChange={handlePriceChange} 
              onKeyDown={handleKeyDown}  // 백스페이스 처리
              className={isTalentDonation ? 'talent-donation' : ''} // 재능 기부일 경우 클래스 적용
            />
            {priceMessage && <PriceMessage>{priceMessage}</PriceMessage>}
          </InputWrapper>

          <SectionTitle>상세 설명</SectionTitle> {/* 상세 설명 제목 */}
            <InputWrapper>
              <TextArea
                placeholder="상세 설명을 입력해주세요" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </InputWrapper>

            <SubmitButton onClick={handleSubmit}>글 작성하기</SubmitButton> {/* 게시물 작성 버튼 */}

          <BottomBox>
            <Footer />
          </BottomBox>
          
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
    </div>
  );
}
export default Edit;
