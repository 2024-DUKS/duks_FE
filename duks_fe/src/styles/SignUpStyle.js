import styled from "styled-components";

// 화면 바깥 배경색을 위한 글로벌 스타일
export const BackgroundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 전체 화면 높이 */
`;

// 회원가입페이지 컨테이너
export const SignUpContainer = styled.div`
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

// Background 스타일 추가
export const TopBox = styled.div`
  //background-color: #FFB204;
  position: relative; /* 부모 컨테이너 기준으로 배치 */
  height: 62px;
  width: 100%; /* 430px 대신 100%로 설정 */
  left: 0;
  top: 0;

  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: space-between;
`;

// BackButton 스타일 수정
export const BackButton = styled.button`
  background: none; /* 배경 없음 */
  border: none;     /* 테두리 없음 */
  cursor: pointer;  /* 커서 포인터 */
  padding: 0;       /* 기본 패딩 제거 */
  margin-left: 20px;

  /* 크기 설정 (필요에 따라 조정) */
  width: 18px;  /* 너비 설정 */
  height: 18px; /* 높이 설정 */

  img {
    width: 100%;  /* 버튼 너비에 맞춤 */
    height: auto;  /* 비율 유지 */
  }
`;

// "회원가입" 타이틀 스타일 
export const Title = styled.h2`
  display: flex;
  font-size: 18px;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center;     /* 수평 중앙 정렬 */
  height: 100%;            /* 높이를 100%로 설정하여 전체 영역 차지 */
  margin: 0;              /* 기본 마진 제거 */
  margin-right: 50px;
  flex-grow: 1;           /* 여유 공간을 차지하도록 설정 */
  text-align: center;     /* 텍스트 중앙 정렬 */
`;


// 입력 필드 스타일
export const InputField = styled.div`
  margin-bottom: 30px;

  label {
    display: block;
    margin-bottom: 10px;
  }

  input, select {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

// 필수 항목 표시 스타일
export const Required = styled.span`
  color: #FFB204;
  margin-left: 5px; /* 레이블과 약간의 간격 추가 */
`;

export const ButtonContainer = styled.div`
  display: grid;
  justify-items: center; /* 수평 중앙 정렬 */
  width: 100%; /* 부모 div 너비 */
  margin-top: 40px;
  position: relative;
`;

// 제출 버튼 스타일
export const SubmitButton = styled.button`
  background-color: #FFB204;
  color: white;
  font-size: 16px;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  width: 50%; 

  &:hover {
    background-color: #FFB204; /* 버튼 호버 색상 변경 */
  }
`;

export const Form = styled.form`
  width: 80%; /* 폼의 너비를 전체로 설정 */
  padding: 40px; /* 폼에 패딩 추가 */
`;

// ErrorMessage 스타일 수정
export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -20px; /* SubmitButton과 겹치도록 위치 조정 */
  text-align: center;
  position: relative; /* 상대 위치 */
  z-index: 1; /* SubmitButton 위에 나타나도록 */
`;
