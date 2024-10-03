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
  background-color: #92b455;
  position: absolute;
  height: 62px;
  width: 430px;
  left: 0;
  top: 0;
`;

export const BottomBox = styled.div`
  background-color: #92b455;
  position: absolute;
  height: 62px;
  width: 430px;
  bottom: 0px;
`;


///시시시시시작작ㅈ갖갖가

export const BusinessCard = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const OverlapWrapper = styled.div`
  background-color: #ffffff;
  height: 932px;
  width: 430px;
`;

export const Overlap = styled.div`
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0px 4px 4px #00000040;
  height: 582px;
  left: 34px;
  position: relative;
  top: 171px;
  width: 360px;
`;

export const InputPhoto = styled.img`
  height: 188px;
  left: 86px;
  position: absolute;
  top: 38px;
  width: 190px;
`;

export const OverlapGroup = styled.div`
  background-color: #d9d9d9;
  border-radius: 94px;
  height: 188px;
  position: relative;
  width: 188px;
`;

export const TextDiv = styled.div`
  color: #000000;
  font-family: "Inter-Light", Helvetica;
  font-size: 8px;
  font-weight: 300;
  height: 21px;
  left: 64px;
  text-align: center;
  position: absolute;
  top: 83px;
  width: 60px;
`;

export const Image = styled.img`
  height: 180px;
  left: 5px;
  position: absolute;
  top: 3px;
  width: 180px;
`;

export const UserName = styled.div`
  color: #000000;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 24px;
  font-weight: 600;
  left: 111px;
  letter-spacing: 36px;
  position: absolute;
  top: 244px;
`;

export const UserEmail = styled.div`
  color: #666666;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 14px;
  font-weight: 600;
  height: 17px;
  left: 135px;
  text-align: center;
  position: absolute;
  top: 293px;
`;

export const UserAbility = styled.div`
  color: #5a5a5a;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 12px;
  font-weight: 600;
  left: 39px;
  position: absolute;
  top: 343px;
`;

export const UserCharactor = styled.div`
  color: #5a5a5a;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 12px;
  font-weight: 600;
  left: 39px;
  position: absolute;
  top: 460px;
`;
