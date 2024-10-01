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

// 메뉴 아이콘
export const MenuIcon = styled.img`
  height: 44px;
  left: 330px;
  position: absolute;
  top: 18px;
  width: 41px;
`;

// 오버랩
export const Overlap = styled.div`
  height: 43px;
  left: 82px;
  position: relative;
  top: 95px;
  width: 167px;
`;

//내 프로필 조그맣게 뜨는 곳
export const ProfileImage = styled.img`
  width: 62px;  /* 이미지의 너비 */
  height: auto;  /* 비율 유지 */
  visibility: ${({ isLoaded }) => (isLoaded ? 'visible' : 'hidden')};
  }
`;
// 텍스트 스타일
export const TextWrapper = styled.div` //내 별명 크게 뜨는 곳
  font-family: "Pretendard-SemiBold", Helvetica;
  font-weight: 600;
  position: absolute;
  font-size: 18px;
  top: 200px;
  left: 100px;
  text-align: left;
`;

export const TextWrapper2 = styled(TextWrapper)` //21학번
  font-size: 10px;
  position: absolute;
  top: 205px;
  left: 205px;
`;

export const TextWrapper3 = styled(TextWrapper)`
  color: #28272a;
  font-size: var(--16pt-bold-font-size);
  top: 474px;
  left: 350px;
  white-space: nowrap;
`;

export const TextWrapper4 = styled(TextWrapper3)` //포트폴리오 글자
  top: 630px;
  left: 28px;
`;

export const TextWrapper5 = styled(TextWrapper4)` //개인정보 글자
  top: 300px;
  `;

// 아이콘
export const IconsaxLinear = styled.img`
  height: 24px;
  left: 19px;
  position: absolute;
  top: 29px;
  width: 24px;
`;

// 개인 정보 섹션
export const PersonSection = styled.div`
  height: 210px;
  left: 38px;
  position: absolute;
  top: 216px;
  width: 332px;
`;

// 오버랩 그룹
export const OverlapGroup = styled.div`
  background-color: #ffb20408;
  border-radius: 5px;
  box-shadow: 0px 4px 4px #00000040;
  height: 210px;
  position: relative;
  width: 312px;
`;

// 개인 정보 입력 텍스트
export const StdNumText = styled.div`
  color: #ffb204cc;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 15px;
  font-weight: 600;
  height: 23px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: right;
  top: 24px;
  left: 181px;
  width: 113px;
`;

export const PwdText = styled(StdNumText)`
  top: 58px;
  left: 199px;
  width: 95px;
`;

export const NickText = styled(PwdText)`
  top: 96px;
`;

export const DepartText = styled(PwdText)`
  color: #ffb204;
  top: 135px;
`;

export const PhoneText = styled(StdNumText)`
  top: 173px;
  left: 181px;
`;

// 개인 정보 제목 칸
export const StdNum = styled.div`
  color: black;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 15px;
  font-weight: 600;
  height: 23px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: left;
  top: 24px;
  left: 20px;
  width: 113px;
`;

export const Pwd = styled(StdNum)`
  top: 58px;

  width: 95px;
`;

export const Nick = styled(Pwd)`
  top: 96px;
`;

export const Depart = styled(Pwd)`
  top: 135px;
`;

export const Phone = styled(StdNum)`
  top: 173px;
`;



// 바닥글 텍스트
export const FooterText1 = styled.div`
  color: #000000;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 12px;
  font-weight: 600;
  height: 24px;
  text-align: center;
  left: 140px;
  width: 108px;
  position: absolute;
  top: 559px;
`;

export const FooterText2 = styled(FooterText1)`
  top: 595px;
`;

// MyPageStyle.js

export const Person = styled.div`
  // 스타일 정의
`;

export const LogoutText = styled.div`
  position: absolute;
  text-align: center;
  top: 750px;
`;

export const AccountDeletionText = styled.div`
  position: absolute;
  text-align: center;
  top: 800px;
`;
