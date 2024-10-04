import React, { useState } from "react";
import * as J from "../styles/JoinStyle";
import { Link } from 'react-router-dom';
import logo from '../img/logo.jpg'; // 로고 이미지 파일 경로
import addLogo from '../img/logo_img.jpg'; // 추가 로고 이미지 파일 경로

function Join() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 formData를 서버로 전송하거나 처리하는 로직을 추가합니다.
    console.log(formData);
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
              <label htmlFor="username">아이디</label>
              <input
                type="text"
                name="username"
                value={formData.username}
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
