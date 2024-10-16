import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios import 추가
import { useNavigate } from 'react-router-dom';

import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, BottomBox,
  BusinessCard, OverlapWrapper, Overlap, InputPhoto, OverlapGroup,
  TextDiv, Image, UserName, UserEmail, UserAbility, UserCharactor,TopLink, BackButton, PageTitle
} from '../styles/CardStyle'; 

import Footer from '../components/Footer';
import MakeAbilityButton from '../components/MakeAbilityButton';
import MakeChaButton from '../components/MakeChaButton';
import ProfileImageUploader from '../components/ProfileImageUpLoader';
import backButton from '../img/backButton.png';

const Card = () => {
  // 유저 정보를 저장할 상태
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    profileImage: ''  // 프로필 이미지 상태 추가
  });

  // 유저 정보를 불러오는 함수
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰 추가
        },
      });

      // 서버로부터 받은 유저 데이터를 상태에 저장
      setUserData({
        name: response.data.nickname, // 이름
        phone: response.data.phone,    // 전화번호
        profileImage: response.data.profileImage || '/default-profile.png',  // 프로필 이미지 저장
      });

      localStorage.setItem('userProfileImage', response.data.profileImage || '/default-profile.png');
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
          <TopLink><a href="../NextPage">포트폴리오 자세히 보기</a></TopLink>
          <OverlapWrapper>

            <Overlap>
              {/*명함 프로필 업로드 컴포넌트*/}
              <ProfileImageUploader />
              <UserName>{userData.name || '이름'}</UserName> {/* 이름을 받아옴 */}
              <UserEmail>{userData.phone || '전화번호'}</UserEmail> {/* 전화번호를 받아옴 */}
              <div>
                <UserAbility>
                  <div className="button-container">
                    <MakeAbilityButton />
                  </div>
                </UserAbility>
              </div>

              <div>
                <UserCharactor>
                  <div className="button-container">
                    <MakeChaButton />
                  </div>
                </UserCharactor>
              </div>
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

export default Card;