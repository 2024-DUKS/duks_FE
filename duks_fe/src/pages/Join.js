import React, { useState } from "react";
import axios from 'axios';
import * as J from "../styles/JoinStyle";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.jpg'; // 로고 이미지 파일 경로
import addLogo from '../img/logo_img.jpg'; // 추가 로고 이미지 파일 경로

function Join() {
  const [formData, setFormData] = useState({
    studentId: "",
    password: ""
  });

  const navigate=useNavigate(); // 페이지 이동을 위한 useNavigate 사용
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // 여기에서 formData를 서버로 전송하거나 처리하는 로직을 추가합니다.
    try {
      // 로그인 요청을 서버로 보냄
      const response = await axios.post("http://localhost:5000/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 서버로부터 토큰을 받아옴
      const { message, token } = response.data;

      // 토큰을 localStorage에 저장하여 세션 관리
      localStorage.setItem("authToken", token);

      // 로그인 성공 메시지 출력 (필요 시 상태나 페이지 이동)
      console.log("로그인 성공:", response.data);
      setErrorMessage(""); // 에러 메시지 초기화

      // 페이지 이동 
      navigate("/Main");
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("로그인 실패. 아이디 또는 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <J.BackgroundWrapper>
      <J.LoginContainer>
        <J.InnerDiv>
          <J.LogoContainer>
            <J.Logo src={logo} alt="로고" />
            <J.AddLogo src={addLogo} alt="추가 이미지" />
          </J.LogoContainer>
          <J.Form onSubmit={handleSubmit}>
            <J.InputField>
              <label htmlFor="studentId">아이디</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
                required
              />
            </J.InputField>
            <J.InputField>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </J.InputField>
            <J.ButtonContainer>
              {errorMessage && (
                <J.ErrorMessage>{errorMessage}</J.ErrorMessage>
              )}
              <J.LoginButton type="submit">로그인</J.LoginButton>
            </J.ButtonContainer>
          </J.Form>
          <J.SignUpPrompt>
            회원으로 가입하시겠습니까? <Link to="/SignUp"><J.SignUpButton>회원가입</J.SignUpButton></Link>
          </J.SignUpPrompt>
        </J.InnerDiv>
      </J.LoginContainer>
    </J.BackgroundWrapper>
  );
}

export default Join;
