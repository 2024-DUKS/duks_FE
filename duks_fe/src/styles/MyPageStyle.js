import styled from 'styled-components';

export const BackgroundWrapper = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyPageContainer = styled.div`
  width: 430px;
  height: 932px;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InnerDiv = styled.div`
  width: 430px;
  height: 932px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const TopBox = styled.div`
  background-color: #FFB204;
  position: relative; 
  height: 62px;
  width: 100%; 
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

export const BackButton = styled.button`
  background: none; 
  border: none;
  cursor: pointer;
  padding: 0;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 5px;
  width: 18px; 
  height: 18px;
  img {
    width: 100%; 
    height: auto;
  }
`;

export const PageTitle = styled.div`
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-right: 167px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

//프로필사진+닉네임 님
export const TextWrapper = styled.div`
  margin-top: 30px;

  font-family: "Pretendard-SemiBold", Helvetica;
  font-weight: 600;
  font-size: 18px;
  position: absolute;
  top: 100px;
  left: 100px;
  text-align: left;
`;

//21학번
export const TextWrapper2 = styled.div`
  font-size: 13px;
  position: absolute;
  top: 133px;
  left: 200px;
`;

//개인정보 텍스트
export const TextWrapper5 = styled.div`
  top: 215px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  position: absolute;
  left: 28px;
  width: 150px; // 원하는 너비
  height: auto;
`;

//개인정보 박스 전체 이동
export const Person = styled.div`
  margin-top: 210px;
`;

export const OverlapGroup = styled.div`
  background-color: #ffb20408;
  border-radius: 5px;
  box-shadow: 0px 4px 4px #00000040;
  //height: 210px;
  //width: 312px;
  height: 220px;
  width: 325px;
  position: relative;
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
export const Nick = styled(StdNum)`
  top: 96px;
`;
export const Depart = styled(StdNum)`
  top: 135px;
`;
export const Phone = styled(StdNum)`
  top: 173px;
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

export const NickText = styled(StdNumText)`
  top: 96px;
`;
export const DepartText = styled(StdNumText)`
  color: #ffb204;
  top: 135px;
`;
export const PhoneText = styled(StdNumText)`
  top: 173px;
  left: 181px;
`;

//나의 관심 게시물
export const TextWrapper4 = styled.div`

  img {
    margin-left: 0px;
    width: 10px;
    height: auto;
  }

  top: 550px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  position: absolute;
  left: 28px;
  width: 150px; // 원하는 너비
  height: auto;
`;

//내가 작성한 게시물
export const TextWrapper6 = styled.div`
  img {
    margin-left: 0px;
    width: 10px;
    height: auto;
  }

  top: 610px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  position: absolute;
  left: 28px;
  width: 200px; // 원하는 너비
  height: auto;
`;

//우리학교 바로가기
export const TextWrapper7 = styled.div`
  img {
    margin-left: 0px;
    width: 10px;
    height: auto;
  }

  top: 670px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  position: absolute;
  left: 28px;
  width: 200px; // 원하는 너비
  height: auto;
`;

export const LogoutText = styled.div`
  margin-top: 253px;
  cursor: pointer;
`;

export const AccountDeletionText = styled.div`
  margin-top: 20px;
  cursor: pointer;
`;



