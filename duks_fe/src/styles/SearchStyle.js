import styled from 'styled-components';

// 화면 바깥 배경색을 위한 글로벌 스타일
export const BackgroundWrapper = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 마이 페이지 컨테이너
export const MyPageContainer = styled.div`
  width: 430px;
  height: 932px;
  background-color: black;

  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 상단부터 정렬 */
  align-items: center;
`;

// 내부 div
export const InnerDiv = styled.div`
  width: 430px;
  height: 932px;
  background-color: #ffffff;

  /* Flexbox 설정 */
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  align-items: center; /* 수평 중앙 정렬 */
  position: relative;
`;

// 상단 박스
export const TopBox = styled.div`
  background-color: #FFB204;
  position: relative; /* 부모 컨테이너 기준으로 배치 */
  height: 62px;
  width: 100%; /* 430px 대신 100%로 설정 */
  left: 0;
  top: 0;
`;

// BackButton 스타일
export const BackButton = styled.button`
  background: none; /* 배경 없음 */
  border: none;     /* 테두리 없음 */
  cursor: pointer;  /* 커서 포인터 */
  padding: 0;       /* 기본 패딩 제거 */
  margin-left: 5px;
  margin-right: 5px;

  /* 크기 설정 (필요에 따라 조정) */
  width: 18px;  /* 너비 설정 */
  height: 18px; /* 높이 설정 */

  img {
    width: 100%;  /* 버튼 너비에 맞춤 */
    height: auto;  /* 비율 유지 */
  }
`;


// 검색 컨테이너 스타일
export const SearchContainer = styled.div`
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 85%; /* TopBox 내에서 전체 너비 차지 */
  padding: 10px;
`;

// 검색 입력창 스타일
export const SearchInput = styled.input`
  width: 50%; /* 검색창 너비 조정 */
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
`;

export const SearchIcon = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
  position: absolute; /* TopBox 내에서 절대 위치 */
  right: 15px; /* 오른쪽 정렬 */
  top: 50%; /* 수직 중앙 정렬 */
  transform: translateY(-50%); /* 수직 위치를 정확히 중앙으로 */
  margin-left: 20px;
`;

// 게시물 리스트 박스 스타일+스크롤 추가
export const PostListBox = styled.div`
  width: 95%;
  height: 86%;
  //max-height: 560px; /* 화면에 보이는 최대 높이를 설정 */
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto; /* 수직 스크롤 추가 */
  padding-right: 10px; /* 스크롤 바와 내용 간격을 위한 패딩 */
`;


// 각 게시물 아이템 스타일
export const PostItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1; /* 마우스 오버 시 배경색 변경 */
  }
`;

// 게시물 이미지 스타일
export const PostImage = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  //object-fit: contain;
  border-radius: 8px;
  margin-right: 15px;
  object-fit: cover; // 비율에 맞게 이미지 조정
  flex-shrink: 0; // 이미지가 줄어들지 않도록 설정
`;

// 게시물 내용 스타일
export const PostContent = styled.div`
display: flex;
//flex-direction: row;  // 수평으로 정렬
flex-direction: column;  // 세로 방향으로 정렬
justify-content: space-between; // 공간 균일 분배
padding: 10px; // 여백 추가
width: 100%;
`;

// 게시물 정보 스타일 (제목 및 세부정보)
export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* 공간을 모두 차지하도록 설정 */
`;

// PostPrice 스타일: 가격 스타일 조정
export const PostPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

// PostTitle 스타일: 제목 스타일 조정
export const PostTitle = styled.div`
  font-size: 14px;
  color: #000000;
  margin-top: 4px;  // 가격과 제목 사이 간격 조정
`;

// 게시물 세부정보 스타일
export const PostDetails = styled.p`
  font-size: 13px;
  color: #000000;
  margin: 20px 0 0;
  //margin-top: 6px;
  align-self: flex-start; // 세부 정보를 왼쪽으로 정렬
`;

// 하트 아이콘 스타일
export const HeartIcon = styled.span`
  color: #FFB204;
  font-size: 13px;
  margin-right: 5px;
`;

// 하트 개수 스타일
export const HeartCount2 = styled.span`
  font-size: 13px;
  color: #FFB204;
`;

export const HeartContainer = styled.div`
  display: flex;
  align-items: center;/*flex-end;*/ /* 오른쪽 정렬 */
  justify-content: center; /* 중앙 정렬 */
  margin: 20px 0 0;
`;

export const PostInfo2 = styled.div`
  display: flex;
  justify-content: space-between; // PostDetails와 HeartContainer를 양 끝에 배치
  align-items: center; // 수직 중앙 정렬
  margin-top: 10px; // 위쪽 여백
`;

// 스타일 추가
export const NoResultsMessage = styled.p`
  font-size: 16px;
  color: #92B455; //#555
  text-align: center; // 중앙 정렬
  margin-top: 40px; // 위쪽 여백
`;

// 하단 박스
export const BottomBox = styled.div`
  background-color: #FFB204;
  position: absolute;
  height: 62px;
  width: 100%;
  bottom: 0px;
`;