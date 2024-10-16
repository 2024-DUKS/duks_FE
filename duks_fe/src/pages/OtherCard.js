import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios import 추가
import { useNavigate } from 'react-router-dom';

import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, BottomBox,
  BusinessCard, OverlapWrapper, Overlap, InputPhoto, OverlapGroup,
  TextDiv, Image, UserName, UserEmail, UserAbility, UserCharactor,TopLink, BackButton, PageTitle
} from '../styles/OtherCardStyle'; 

import Footer from '../components/Footer';
import MakeAbilityButton from '../components/MakeAbilityButton';
import MakeChaButton from '../components/MakeChaButton';
import ProfileImageUploader from '../components/ProfileImageUpLoader';
import backButton from '../img/backButton.png';

const OtherCard = () => {
  const navigate = useNavigate();
  
  // 유저 정보와 추가 데이터를 저장할 상태
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    department: '',
    nickname: '',
    skills: [],
    charactor: '',
    profileImage: '',
    portfolioImages: []
  });

  // 유저 정보를 불러오는 함수
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userId = 16; // 해당 부분을 동적으로 변경 가능
      
      const response = await axios.get(`http://localhost:5000/api/portfolio/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰 추가
          'Content-Type': 'application/json' // 헤더에 Content-Type 추가
        },
      });

      const data = response.data;

      // 서버로부터 받은 유저 데이터를 상태에 저장
      setUserData({
        name: data.user.name,
        phone: data.user.phone,
        department: data.user.department,
        nickname: data.user.nickname,
        skills: data.skills,
        charactor: data.charactor.charactor,
        profileImage: data.profileImage,
        portfolioImages: data.portfolioImages
      });
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 유저 정보 불러오기
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox>
            <BackButton onClick={() => navigate(-1)}>
              <img src={backButton} alt="BackButton" />
            </BackButton>
            <PageTitle>포트폴리오</PageTitle>
          </TopBox>
          <TopLink><a href="../OtherNextPage">포트폴리오 자세히 보기</a></TopLink>
          <OverlapWrapper>

            <Overlap>
              {/* 명함 프로필 업로드 컴포넌트 */}
              <ProfileImageUploader />
              <UserName>{userData.nickname || '이름'}</UserName> {/* 닉네임을 받아옴 */}
              <UserEmail>{userData.phone || '전화번호'}</UserEmail> {/* 전화번호를 받아옴 */}

              {/* 유저 스킬 출력 */}
              <UserAbility>
                {userData.skills.map((skill) => (
                  <div key={skill.id}>
                    {skill.skill} - {skill.level}
                  </div>
                ))}
              </UserAbility>

              {/* 유저 캐릭터 출력 */}
              <UserCharactor>
                {userData.charactor}
              </UserCharactor>
            </Overlap>
          </OverlapWrapper>

          <BottomBox>
            <Footer />
          </BottomBox>
          
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
}

export default OtherCard;
