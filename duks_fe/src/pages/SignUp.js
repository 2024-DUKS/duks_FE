import React, { useState } from "react";
import * as S from "../styles/SignUpStyle";
import { Link } from 'react-router-dom';
import backButton from '../img/backButton.png';

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    nickname: "",
    department: "",
    phone: ""
  });

  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기 상태 추가

  const departments = [
    "IT",
    "아트/디자인",
    "사회과학",
    "경영/경제",
    "자연과학",
    "인문학",
    "바이오/약학",
    "교육"
  ];

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
    <S.BackgroundWrapper>
      <S.SignUpContainer>
        <S.InnerDiv>
          <S.TopBox>
            <Link to="/Join" style={{ textDecoration: 'none' }}>
              <S.BackButton>
                <img src={backButton} alt="BackButton" />
              </S.BackButton>
            </Link>
            <S.Title>회원가입</S.Title>
          </S.TopBox>
          <S.Form onSubmit={handleSubmit}>
            <S.InputField>
              <label htmlFor="name">이름<S.Required>*</S.Required></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요" // 힌트 추가
                required
              />
            </S.InputField>
            <S.InputField>
              <label htmlFor="username">아이디<S.Required>*</S.Required></label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="학번을 입력하세요" 
                required
              />
            </S.InputField>
            <S.InputField>
              <label htmlFor="password">비밀번호<S.Required>*</S.Required></label>
              <input
                type={showPassword ? "text" : "password"} // 비밀번호 보이기 토글
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="숫자, 영문 조합 최소 8자"
                required
              />
            </S.InputField>
            <S.InputField>
              <label htmlFor="nickname">닉네임<S.Required>*</S.Required></label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="닉네임을 입력하세요"
                required
              />
            </S.InputField>
            <S.InputField>
              <label htmlFor="department">학과<S.Required>*</S.Required></label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="" disabled>학과 선택</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </S.InputField>
            <S.InputField>
              <label htmlFor="phone">전화번호<S.Required>*</S.Required></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="000-0000-0000"
                required
              />
            </S.InputField>
            <S.ButtonContainer>
              <S.SubmitButton type="submit">회원가입하기</S.SubmitButton>
            </S.ButtonContainer>
          </S.Form>
        </S.InnerDiv>
      </S.SignUpContainer>
    </S.BackgroundWrapper>
  );
}

export default SignUp;
