import styled from "styled-components";

// 전체 페이지 배경 (화면이 아닌 부분)
export const PageWrapper = styled.div`
.main-page-wrapper & {
  background-color:#000000; /* 화면 바깥 배경색 설정 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이를 채우도록 설정 */
  width: 100vw; /* 화면 전체 너비를 채우도록 설정 */
}
`;

// 앱 화면 (화면 크기에 맞게 조절)
export const Background = styled.div`
.main-page-wrapper & {
  max-width: 430px; /* 최대 너비를 430px로 제한 */
  max-height: 932px; /* 최대 높이를 932px로 제한 */
  background-color: #000000;
  margin: 0 auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
`;

// 메인 컨텐츠를 담는 컨테이너
export const MainContainer = styled.div`
.main-page-wrapper & {
  width: 430px;
  height: 932px;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
`;

// 로고 컨테이너
export const LogoContainer = styled.div`
.main-page-wrapper & {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;
  position: relative; /* 로고를 절대 위치로 배치하기 위해 */
  top: 0px; /* 상단에 고정 */
}
`;

// 왼쪽 로고
export const LogoLeft = styled.img`
.main-page-wrapper & {
  width: 275px;
  height: auto;
}
`;

// 오른쪽 이미지
export const LogoRight = styled.img`
.main-page-wrapper & {
  width: 125px;
  height: auto;
}
`;

// 검색창 컨테이너
export const SearchContainer = styled.div`
.main-page-wrapper & {
  position: relative; /* 검색창 내부 아이콘 배치에 필요 */
  width: 90%;  /* 검색창을 가득 채우기 */
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px; /* 검색창 아래 간격 */
}
`;

// 돋보기 아이콘 문자 스타일 (검색창 내부에 고정)
export const SearchIcon = styled.span`
.main-page-wrapper & {
  position: absolute;
  left: 20px;  /* 검색창 왼쪽에 20px 위치 */
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #aaa;
}
`;

// 검색창 스타일
export const SearchInput = styled.input`
.main-page-wrapper & {
  width: 90%;  /* 검색창 너비를 90%로 설정 */
  padding: 12px 20px 12px 50px;  /* 왼쪽 padding을 넓게 설정하여 아이콘 공간 확보 */
  border-radius: 25px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  outline: none;
  height: 25px;  /* 높이를 지정하여 검색창 두께 증가 */

  &::placeholder {
    color: #aaa;
  }
}
`;

// 아이콘 그리드
export const IconGrid = styled.div`
.main-page-wrapper & {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 90%;
  margin-bottom: 3px;
  row-gap: 3px; /* 줄 사이 간격 설정 */
}
`;

// 아이콘 항목
export const IconItem = styled.div`
.main-page-wrapper & {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  flex-basis: calc(25% - 10px);  /* 4개가 균등하게 배치되도록 너비를 설정 */
  text-align: center;
  cursor: pointer;

  /* Link를 블록 요소로 변환 */
  a {
    display: flex; /* Link가 블록 요소로 동작하고, 이미지와 텍스트가 수직 정렬되도록 설정 */
    flex-direction: column;
    align-items: center;
    text-decoration: none; /* 링크 밑줄 제거 */
  }

  img {
    width: 40px;
    height: auto;
    margin-bottom: 8px;
  }

  span {
    font-size: 13px;
    color: #333;
  }

  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
}
`;

// 포스트 항목 (메모지 스타일 적용)
export const PostItem = styled.div`
.main-page-wrapper & {
  background-color: #ffedc8; /* 메모지의 기본 배경색 */
  width: 120px;  /* 포스트의 고정된 가로 크기 */
  height: 110px;  /* 포스트의 고정된 세로 크기 */
  padding: 15px;
  border-radius: 0 0 50px 0;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-align: left;
  cursor: pointer;
  overflow: hidden;

  /* 메모지 하단에 말린 효과 */
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: -1;
  }

  /* 메모지 오른쪽 아래 모서리에 곡선 말림 효과 */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background-color: #fff7e6;
    background-color: #ffd966; /* 말린 부분의 색상 */
  }

  &:hover {
    transform: scale(1.05);
    transition: 0.3s;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
}
`;





// 포스트 제목
export const PostTitle = styled.h3`
.main-page-wrapper & {
  font-size: 14px;
font-weight: bold;
margin-top: 3px;
margin-bottom: 8px;
color: #333;
position: relative;
z-index: 1; /* 텍스트가 말린 부분보다 위에 있도록 설정 */
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: clip; /* 말줄임표 없이 텍스트를 자름 */

}
`;

// 포스트 내용
export const PostContent = styled.p`
.main-page-wrapper & {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  position: relative;
  z-index: 1;
  max-height: calc(1.4em * 4); /* 4줄까지만 표시 */
  overflow: hidden; /* 초과된 텍스트 숨김 */
  white-space: normal; /* 줄바꿈을 허용 */
  word-break: break-word; /* 긴 단어는 줄바꿈 */

  /* 말줄임표가 붙지 않도록 강제로 설정 */
  text-overflow: clip; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: unset; /* 이 부분을 명시적으로 해제 */
  display: block;
  
}
`;

// 섹션 제목 스타일 (예: 최신글 <해드립니다>)
export const SectionTitle = styled.h2`
.main-page-wrapper & {
  width: 90%;
  font-size: 16px;
  color: #333;
  margin-top: 5px;
  margin-bottom: 15px;
  text-align: left;
}
`;

// 포스트 그리드
export const PostGrid = styled.div`
.main-page-wrapper & {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 20px;
  gap: 10px; /* 포스트 사이 간격 */
}
`;

export const BottomBox = styled.div`
.main-page-wrapper & {
  background-color: #FFB204;
  position: relative; 
  height: 62px;
  width: 430px;
  bottom: 0px;
  margin-top: auto;  /* 컨텐츠 끝에 위치하게 함 *
}
`;