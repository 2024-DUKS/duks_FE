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



//여긴 nextPage 스타일들
export const TopLink = styled.div`
  color: #5a5a5a;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 12px;
  font-weight: 600;
  left: 250px;
  position: absolute;
  top: 150px;
`;


// 사진 및 내용 입력 스타일 추가
export const StyledTextArea = styled.textarea`
  width: 80%;  // 너비를 80%로 조정
  height: 100px;  // 높이 설정
  margin: 5px 0; 
  background-color: #f0f0f0; // 배경색 조정
  color: #333;  // 글자색 조정
  border: 1px solid #ccc; // 테두리 색상
  border-radius: 5px;  // 모서리 둥글게
  padding: 10px;  // 패딩 추가
`;

export const PButton = styled.button`
  background-color: lightgray; // 배경색 설정 (원하는 색으로 조정 가능)
  color: white; // 글자색
  border: none; // 테두리 없애기
  cursor: pointer; // 커서 모양을 포인터로 변경
  padding: 3px 8px 3px 8px; // 패딩 추가
  font-size: 12px; // 글자 크기 조정
  border-radius: 20px;
`;

export const NButton = styled.button`
  background-color: lightgray; // 배경색 설정 (원하는 색으로 조정 가능)
  color: white; // 글자색
  border: none; // 테두리 없애기
  cursor: pointer; // 커서 모양을 포인터로 변경
  padding: 3px 8px 3px 8px; // 패딩 추가
  font-size: 12px; // 글자 크기 조정
  border-radius: 20px;
`;

export const CustomFileInput = styled.input`

`;

export const CustomFileButton = styled.label`

`;

export const StyledH2 = styled.h2`
  font-size: 20px;
  background-color: #92b455; // 배경색 설정 (원하는 색으로 조정 가능)
  color: white; // 글자색
  border: none; // 테두리 없애기
  border-radius: 20px;
  padding: 3px 8px 3px 8px; // 패딩 추가
  margin-right: 80px;
  margin-left: 80px;
`;