import styled from "styled-components";

// 전체 페이지 배경 및 크기 설정
export const SearchPageWrapper = styled.div`
  width: 430px;
  height: 932px;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 상단부터 정렬 */
  align-items: center;
`;

// 검색창 컨테이너
export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%; /* 검색창 너비 */
  margin-top: 20px;
`;

// 검색 입력창 스타일
export const SearchInput = styled.input`
  width: 90%; /* 입력창이 페이지 너비의 대부분을 차지하도록 */
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

// 게시물 리스트 컨테이너
export const PostListBox = styled.div`
  width: 90%;
  max-height: 70%; /* 리스트가 화면 높이의 70%를 차지하도록 */
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding-right: 10px;
`;

// 개별 게시물 아이템
export const PostItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

// 게시물 이미지
export const PostImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 15px;
`;

// 게시물 내용
export const PostContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

// 게시물 정보 (제목, 가격, 세부사항)
export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

// 게시물 제목
export const PostTitle = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
`;

// 게시물 가격
export const PostPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #FFB204;
`;

// 게시물 세부사항 (작성자, 시간)
export const PostDetails = styled.p`
  font-size: 12px;
  color: #777;
`;

// 하트 컨테이너
export const HeartContainer = styled.div`
  display: flex;
  align-items: center;
`;

// 하트 아이콘
export const HeartIcon = styled.span`
  font-size: 16px;
  color: #FFB204;
  margin-right: 5px;
`;

// 하트 개수
export const HeartCount2 = styled.span`
  font-size: 14px;
  color: #FFB204;
`;

