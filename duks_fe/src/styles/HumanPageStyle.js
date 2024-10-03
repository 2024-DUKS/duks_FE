import styled from "styled-components";

// 화면 바깥 배경색을 위한 글로벌 스타일
export const BackgroundWrapper = styled.div`
  background-color:black; /* 화면 바깥 배경색 설정 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
`;

//CSS 모음
// 마이 페이지 컨테이너
export const MyPageContainer = styled.div`
  width: 430px;
  height: 932px;
  background-color: black;

    /* Flexbox 설정 */
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center;     /* 수평 중앙 정렬 */

  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

// 내부 div
export const InnerDiv = styled.div`
  width: 430px;
  height: 932px;
  background-color: #ffffff;

  /* Flexbox 설정 */
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center;     /* 수평 중앙 정렬 */
  position: relative;

`;


export const TopBox = styled.div`
  background-color: #FFB204;
  position: absolute;
  height: 62px;
  width: 430px;
  left: 0;
  top: 0;
`;

export const BottomBox = styled.div`
  background-color: #FFB204;
  position: absolute;
  height: 62px;
  width: 430px;
  bottom: 0px;
`;
