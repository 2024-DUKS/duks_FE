import styled from "styled-components";
import { Link } from 'react-router-dom';

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

// 하단 박스
export const BottomBox = styled.div`
  background-color: #FFB204;
  position: absolute;
  height: 62px;
  width: 100%;
  bottom: 0px;
`;

// 공지사항 박스
export const NoticeBox = styled.div`
  width: 90%; /* 박스 크기 조절 */
  height: 10px;
  background-color: rgba(255, 178, 4, 0.28); /*#ffffff*/
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px; /* TopBox 아래로 70px 간격 */
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  /* Flexbox 사용하여 중앙 정렬 */
  display: flex;
  /*justify-content: center;*/ /* 수평 중앙 정렬 */
  align-items: center;     /* 수직 중앙 정렬 */
  text-align: left;      /* 텍스트 왼쪽 정렬 */
`;

// 제목
export const Title = styled.h1`
  font-size: 32px;
  color: #333;
  text-align: center;
  margin: 0;
  margin-left: 18px;
`;

// 검색 컨테이너 스타일
export const SearchContainer = styled.div`
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 85%; /* TopBox 내에서 전체 너비 차지 */
  padding: 10px;
`;

// 검색 아이콘 스타일
export const SearchIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute; /* TopBox 내에서 절대 위치 */
  right: 15px; /* 오른쪽 정렬 */
  top: 50%; /* 수직 중앙 정렬 */
  transform: translateY(-50%); /* 수직 위치를 정확히 중앙으로 */
  margin-right: 10px;
`;

// 검색 입력창 스타일
export const SearchInput = styled.input`
  width: 60%; /* 검색창 너비 조정 */
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
`;

// 공지사항 내용
export const Notice = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  text-align: center;
  margin: 0;
`;

export const NoticeImage = styled.img`
  width: 24px;  /* 이미지 너비 조정 */
  height: 24px; /* 이미지 높이 조정 */
  margin-right: 10px; /* 이미지와 텍스트 사이의 간격 */
`;

// 인기글 박스 스타일
export const HotBox = styled.div`
  width: 90%;
  //height: 40px;
  background-color: #fff; /* 배경색 */
  border: 2px solid #92B455; /* 테두리 색 */
  border-radius: 8px; /* 모서리 둥글기 */
  margin-top: 10px; /* 위쪽 여백 */
  padding: 10px; /* 내부 여백 */
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
`;

// 인기글 제목 스타일
export const HotTitle = styled.p` /*h2*/
  font-size: 16px;
  color: #333;
  margin: 5px 0; /* 위아래 여백 */
  display: flex; /* Flexbox로 정렬 */
  justify-content: space-between; /* 제목과 하트 개수를 양쪽으로 정렬 */
  align-items: center;  /*수직중앙정렬*/
`;

// 하트 개수 스타일
export const HeartCount = styled.span`
  font-size: 16px;
  color: #92B455; /* 하트 개수 색상 */
  //align-self: center; /* 수직 중앙 정렬 */
`;

//인기글 브로콜리 이미지 
export const HotImage = styled.img`
  width: 24px;  /* 이미지 너비 조정 */
  height: 24px; /* 이미지 높이 조정 */
  margin-right: 10px; /* 이미지와 텍스트 사이의 간격 */
`;


// 카테고리 버튼 컨테이너
export const ButtonContainer = styled.div`
  //width: 90%;
  display: flex;
  justify-content: flex-start;
  //margin: 10px 0;
  margin: 25px 0 10px;
`;

// 카테고리 버튼 스타일
export const TypeButton = styled.button`
  background-color: ${props => props.selected ? '#FFB204' : '#ffffff'};
  color: ${props => props.selected ? '#ffffff' : '#FFB204'};
  border: 2px solid #ddd;
  border-radius: 20px;
  padding: 5px 25px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background-color: #FFB204;
    color: #ffffff;
  }
`;

// 게시물 리스트 박스 스타일+스크롤 추가
export const PostListBox = styled.div`
  width: 95%;
  max-height: 560px; /* 화면에 보이는 최대 높이를 설정 */
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
  padding: 10px;
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
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-right: 15px;
`;

// 게시물 내용 스타일
export const PostContent = styled.div`
  display: flex;
  justify-content: space-between;
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
  color: #333;
`;

// PostTitle 스타일: 제목 스타일 조정
export const PostTitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;  // 가격과 제목 사이 간격 조정
`;

// 게시물 세부정보 스타일
export const PostDetails = styled.p`
  font-size: 13px;
  color: #777;
  margin: 20px 0 0;
  //margin-top: 6px;
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
  align-items: flex-end; /* 오른쪽 정렬 */
  justify-content: center; /* 중앙 정렬 */
`;

