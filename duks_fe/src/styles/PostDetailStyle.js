import styled from "styled-components";

// 화면 바깥 배경색을 위한 글로벌 스타일
export const BackgroundWrapper = styled.div`
  .postdetail-page-wrapper & {
    background-color: black;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;  /* 화면 전체 너비 */
  }
`;

// 마이 페이지 컨테이너
export const MyPageContainer = styled.div`
  .postdetail-page-wrapper & {
    width: 430px;
    height: 932px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

// 내부 div
export const InnerDiv = styled.div`
  .postdetail-page-wrapper & {
    width: 430px;
    height: 932px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow-x: hidden; /* 가로 스크롤 방지 */
  }
`;

// 상단 박스
export const TopBox = styled.div`
  .postdetail-page-wrapper & {
    background-color: #FFB204;
    position: absolute;
    height: 62px;
    width: 430px;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1; /* 상단 바의 z-index를 1로 설정 */
  }
`;

export const CloseButton = styled.button`
  .postdetail-page-wrapper & {
    background-color: transparent; /* 배경을 투명하게 설정 */
    color: black; /* X 버튼을 항상 검은색으로 설정 */
    position: absolute;
    left: 23px;
    top: 18px;
    background: none;
    border: none;
    font-size: 21px;
    font-weight: bold;
    cursor: pointer;
    padding: 0; /* 패딩을 없애서 버튼 크기 줄임 */
    width: auto; /* 버튼 크기를 글자에 맞게 설정 */
    height: auto; /* 높이도 글자 크기에 맞게 설정 */
    line-height: 1; /* 라인 높이를 줄여서 버튼이 글자에 맞게 조정됨 */
  }
`;

// 프로필 정보 섹션 스타일
export const ProfileInfo = styled.div`
  .postdetail-page-wrapper & {
    top: 40px; /* 상단 바와 겹치는 위치로 설정 */
    margin-top: 5px;
    margin-right: 200px;
    display: flex;
    align-items: center;
    z-index: 2; /* 상단 바 위로 보이도록 z-index 설정 */
    cursor: pointer;  /* 클릭 가능하도록 포인터 커서 추가 */

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }

    div {
      display: flex;
      flex-direction: column;

      span {
        margin: 0;
        font-weight: 700;  /* 굵게 설정 */
        font-size: 16px;
        color: #333;
      }
    }
  }
`;

// 게시물 내용을 담는 스크롤 가능한 컨테이너 스타일
export const ScrollableContainer = styled.div`
  .postdetail-page-wrapper & {
    max-height: 800px;  /* 최대 높이를 설정하여 그 이상일 때 스크롤이 발생하도록 */
    overflow-y: auto;  /* 세로 스크롤을 활성화 */
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box; /* 패딩을 포함한 박스 크기 계산 */
    overflow-x: hidden;  /* 가로 스크롤 방지 */
  }
`;


// 제목 스타일
export const PostTitle = styled.h1`
  .postdetail-page-wrapper & {
    font-size: 22px;
    font-weight: bold;
    color: black;
    margin-top: 25px;
    display: flex;         /* Flexbox를 사용하여 정렬 */
    justify-content: flex-start; /* 왼쪽 정렬을 Flexbox로 처리 */
    width: 90%;           /* 제목이 부모 요소의 너비를 모두 차지하도록 설정 */
    margin-bottom: 0px;
  }
`;

// InfoContainer 스타일 (카테고리와 날짜를 한 줄에 배치하기 위한 컨테이너)
export const InfoContainer = styled.div`
  .postdetail-page-wrapper & {
    display: flex;  /* Flexbox로 설정하여 한 줄로 배치 */
    justify-content: flex-start;  /* 왼쪽 정렬 */
    align-items: center;  /* 수직 가운데 정렬 */
    width: 100%;
    margin-top: 0px;
  }
`;

// 게시판 이름 스타일
export const BoardName = styled.h2`
  .postdetail-page-wrapper & {
    font-size: 13px;
    color: #333;
    margin-right: 10px; /* 날짜와 간격을 두기 위해 오른쪽 여백 추가 */
    margin-top: 3px;
  }
`;

// 작성 날짜 스타일
export const PostDate = styled.p`
  .postdetail-page-wrapper & {
    font-size: 11px;
    color: #888;
    margin-top: 6px;
  }
`;

// 게시물 내용 스타일
export const PostContent = styled.p`
  .postdetail-page-wrapper & {
    font-size: 16px;
    color: #333;
    padding: 0px;
    text-align: left;
    line-height: 1.6;
    width: 90%;
  }
`;

// 이미지 슬라이더 스타일
export const PostImageWrapper = styled.div`
  .postdetail-page-wrapper & {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 200px;
  }
`;

// 화살표 버튼 스타일
export const ArrowButton = styled.button`
  .postdetail-page-wrapper & {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 2;

    &:first-child {
      left: 10px;  /* 왼쪽 화살표 */
    }

    &:last-child {
      right: 10px;  /* 오른쪽 화살표 */
    }
  }
`;

// 이미지 스타일
export const PostImage = styled.img`
  .postdetail-page-wrapper & {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain; /* 이미지 크기에 맞게 조정 */
    border-radius: 10px;
  }
`;

// 가격 스타일
export const PriceWrapper = styled.div`
  .postdetail-page-wrapper & {
    width: 100%;  /* 부모 컨테이너의 너비를 100%로 설정 */
    padding: 10px;
    font-size: 18px;
    color: #333;
    font-weight: 1000; /* 글씨 두께를 조금 두껍게 설정 */
    margin-top: 10px; /* 이미지와 약간의 간격 */
    text-align: left;  /* 왼쪽 정렬 */
  }
`;

// 좋아요 버튼 스타일
export const LikeButtonWrapper = styled.div`
  .postdetail-page-wrapper & {
    width: 100%;  /* 부모 컨테이너의 너비를 100%로 설정 */
    text-align: right;  /* 오른쪽 정렬 */
    padding: 10px;
    margin-top: 10px;
    margin-right: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  span {
    margin-left: 5px;
    font-size: 16px;
    color: #333;
  }
`;


// 댓글 섹션 스타일
export const CommentSection = styled.div`
  .postdetail-page-wrapper & {
    width: 90%;
    padding: 10px;
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
`;

// 댓글 입력 영역 스타일
export const CommentInputWrapper = styled.div`
  .postdetail-page-wrapper & {
    display: flex;
    align-items: center;
    width: 90%;
    padding: 10px;
    border-top: 1px solid #ddd;
  }
`;

// 댓글 입력창 스타일
export const CommentInput = styled.input`
  .postdetail-page-wrapper & {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

// 댓글 작성 버튼 스타일
export const SubmitButton = styled.button`
  .postdetail-page-wrapper & {
    padding: 10px 20px;
    background-color: #FFB204;
    border: none;
    color: white;
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

// 하단 박스
export const BottomBox = styled.div`
  .postdetail-page-wrapper & {
    background-color: #FFB204;
    position: absolute;
    height: 62px;
    width: 430px;
    bottom: 0px;
  }
`;

export const CommentButton = styled.button`
.postdetail-page-wrapper & {
  background-color: #007bff; /* 기본 배경색 */
  color: white; /* 글자 색상 */
  border: none; /* 테두리 없애기 */
  border-radius: 5px; /* 모서리 둥글게 */
  padding: 8px 12px; /* 여백 */
  margin-left: 8px; /* 버튼 간격 */
  cursor: pointer; /* 마우스 커서 모양 */
  transition: background-color 0.3s; /* 배경색 변화 애니메이션 */

  &:hover {
    background-color: #0056b3; /* 호버 시 배경색 */
  }

  &:focus {
    outline: none; /* 포커스 시 아웃라인 없애기 */
  }
}
`;
