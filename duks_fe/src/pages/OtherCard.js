import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams로 user_id 받아옴
import axios from 'axios'; // axios로 API 호출
import { useNavigate } from 'react-router-dom';
import {
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, BottomBox,
  OverlapWrapper, Overlap, UserName, UserEmail, UserAbility, UserCharactor, BackButton, PageTitle,ParentContainer
} from '../styles/OtherCardStyle';
import Footer from '../components/Footer';
import backButton from '../img/backButton.png';

const OtherCard = () => {
  const navigate = useNavigate();
  const { user_id } = useParams(); // URL에서 user_id를 받아옴
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    department: '',
    nickname: '',
    skills: [],
    charactor: '',
    profileImage: '', // 이미지 경로 상태
  });

  // 유저 정보를 불러오는 함수
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');

      // API 호출: user_id에 해당하는 유저 데이터를 가져옴
      const response = await axios.get(`http://localhost:5000/api/portfolio/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
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
        profileImage: `http://localhost:5000/${data.profileImage.replace(/\\/g, '/')}`, // 이미지 경로 처리
      });
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 유저 정보 불러오기
  useEffect(() => {
    console.log("user_id:", user_id); // user_id가 제대로 들어오는지 확인
    fetchUserData();
  }, [user_id]);

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
          <OverlapWrapper>
            <Overlap>
              {/* 프로필 이미지 렌더링 */}
                {userData.profileImage && (
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      width: '100%', 
                      height: '100%', 
                      marginTop: '20px' // 필요 시 간격 조정
                    }}
                  >
                    <img 
                      src={userData.profileImage} 
                      alt="User Profile" 
                      style={{ 
                        width: '200px', 
                        height: '200px', 
                        borderRadius: '50%', 
                        objectFit: 'cover',
                        marginBottom: '360px' 
                      }} 
                    />
                  </div>
                )}

              <ParentContainer>
                <UserName>{userData.nickname || '이름'}</UserName>
                <UserEmail>{userData.phone || '전화번호'}</UserEmail>
              </ParentContainer>
              

              <div>
                <UserAbility>
                  {/* SKILLS의 폰트 크기를 크게 설정 */}
                  <box style={{ fontSize: '20px', fontWeight: 'bold' }}>SKILL</box>
                  {/* 각 스킬 항목의 폰트 크기를 다르게 설정 */}
                  {userData.skills.map((skill) => (
                    <div key={skill.id} style={{ fontSize: '16px', marginTop: '6px',marginLeft: '5px' }}>
                      {skill.skill} - {skill.level}
                    </div>
                  ))}
                </UserAbility>
              </div>

              <div>
                <UserCharactor>
                <box style={{ fontSize: '20px', fontWeight: 'bold' }}>CHARACTOR</box>
                <div style={{ fontSize: '16px', marginTop: '6px',marginLeft: '5px' }}>
                      {userData.charactor}
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

export default OtherCard;
