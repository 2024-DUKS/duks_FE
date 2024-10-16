import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams로 user_id 받아옴
import axios from 'axios'; // axios로 API 호출
import { useNavigate } from 'react-router-dom';
import {
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, BottomBox,
  OverlapWrapper, Overlap, UserName, UserEmail, UserAbility, UserCharactor, BackButton, PageTitle
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
    profileImage: '',
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
        profileImage: data.profileImage,
        user_id: data.user.userId,  // 여기서 userId를 user_id로 매핑
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
              <UserName>{userData.nickname || '이름'}</UserName>
              <UserEmail>{userData.phone || '전화번호'}</UserEmail>
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
