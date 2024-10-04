import styled from "styled-components";

// 화면 바깥 배경색을 위한 글로벌 스타일
export const BackgroundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 전체 화면 높이 */
`;

// 로그인 페이지 컨테이너
export const LoginContainer = styled.div`
  width: 430px;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 상단부터 정렬 */
  align-items: center;
`;

// 내부 div
export const InnerDiv = styled.div`
  width: 100%;
  background-color: #ffffff;

  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  align-items: center; /* 수평 중앙 정렬 */
  position: relative;
`;

// 로고 및 추가 이미지를 위한 컨테이너
export const LogoContainer = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  margin: 20px 0; /* 위아래 마진 */
`;

// 로고 스타일
export const Logo = styled.img`
  width: 150px; /* 로고 크기 조절 */
  margin: 20px 0; /* 위아래 마진 */
`;

// 추가 이미지 스타일
export const AddLogo = styled.img`
  width: 100px; /* 추가 이미지 크기 조정 (필요에 따라 조정) */
  height: auto; /* 비율 유지 */
  margin-left: 10px; /* 로고와의 간격 추가 */
`;

// 입력 필드 스타일
export const InputField = styled.div`
  margin-bottom: 30px;

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  justify-items: center; /* 수평 중앙 정렬 */
  width: 100%; /* 부모 div 너비 */
  margin-top: 40px; /* 상단 여백 */
`;

// 로그인 버튼 스타일
export const LoginButton = styled.button`
  background-color: #FFB204;
  color: white;
  font-size: 16px;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  width: 50%; 

  &:hover {
    background-color: #FFA300; /* 버튼 호버 색상 변경 */
  }
`;

// 회원가입 프롬프트 스타일
export const SignUpPrompt = styled.p`
  margin-top: 20px; /* 상단 여백 */
  text-align: center; /* 중앙 정렬 */
`;

// 회원가입 버튼 스타일
export const SignUpButton = styled.span`
  color: #FFB204;
  cursor: pointer;
  text-decoration: underline; /* 밑줄 추가 */
  margin-left: 5px;
`;

export const Form = styled.form`
  width: 80%; /* 폼의 너비를 전체로 설정 */
  padding: 40px; /* 폼에 패딩 추가 */
`;

