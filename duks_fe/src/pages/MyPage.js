import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios import 추가
import { Link, useNavigate } from 'react-router-dom';
import { 
  BackgroundWrapper, MyPageContainer, InnerDiv,  
  TextWrapper, TextWrapper2, TextWrapper4, TextWrapper5,  
  Person, OverlapGroup, TopBox, BottomBox, 
  StdNum, Pwd, Nick, Depart, Phone,
  StdNumText, PwdText, NickText, DepartText, PhoneText, 
  LogoutText, AccountDeletionText, 
  BackButton, PageTitle, TextWrapper6
} from '../styles/MyPageStyle'; 

import ImageUploader from '../components/ImageUpLoader';
import Footer from '../components/Footer';
import LogoutButton from '../components/LogoutButton';
import goButton from '../img/goButton.png';
import DeleteAcButton from '../components/DeleteAcButton';
import backButton from '../img/backButton.png'; // 백버튼 이미지 가져오기

const MyPage = () => {
  const navigate = useNavigate();
  // 유저 정보를 저장할 상태
  const [userData, setUserData] = useState({
    studentId: '',
    password: '',
    nickname: '',
    department: '',
    phone: ''
  });

  const [isLoadedMenu, setIsLoadedMenu] = useState(false);
  const [isLoadedArrow, setIsLoadedArrow] = useState(false);
  const [isLoadedProfile, setIsLoadedProfile] = useState(false);

  // 모달 상태
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // 로그아웃 모달 열기/닫기 함수 추가
  const openLogoutModal = () => setLogoutModalOpen(true);
  const closeLogoutModal = () => setLogoutModalOpen(false);

  // 계정 탈퇴 모달 열기/닫기 함수 추가
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // 수정 가능한 상태 관리
  const [isPwdEditable, setPwdEditable] = useState(false);
  const [isPhoneEditable, setPhoneEditable] = useState(false);
  const [isNickEditable, setNickEditable] = useState(false);

  // 더블클릭 이벤트 핸들러
  const handleDoubleClickPwd = () => setPwdEditable(true);
  const handleDoubleClickPhone = () => setPhoneEditable(true);
  const handleDoubleClickNick = () => setNickEditable(true);

  // 수정 완료 핸들러
  const handleBlurPwd = () => setPwdEditable(false);
  const handleBlurPhone = () => setPhoneEditable(false);
  const handleBlurNick = () => setNickEditable(false);

  // 유저 정보를 불러오는 함수
  const fetchUserData = async () => {
    try {
      // 로컬 스토리지에서 저장된 토큰을 가져옴
      const token = localStorage.getItem('authToken');
      
      // 토큰을 Authorization 헤더에 추가하여 서버로 요청
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰 추가
        },
      });

      // 서버로부터 받은 유저 데이터를 상태에 저장
      setUserData(response.data);
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 유저 정보 불러오기
  useEffect(() => {
    fetchUserData();
  }, []);

  // 비밀번호를 별표(*)로 표시하는 함수
  const maskPassword = (password) => {
    return '*'.repeat(Math.min(password.length, 10)); // 비밀번호 길이를 최대 10개 별표로 제한
  };

  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox>
            <BackButton onClick={() => navigate(-1)}>
              <img src={backButton} alt="BackButton" />
            </BackButton>
            <PageTitle>마이페이지</PageTitle>
          </TopBox>
          <Person>  
            <OverlapGroup>
              <StdNum>학번</StdNum>
              <Pwd>비밀번호</Pwd>
              <Nick>닉네임</Nick>
              <Depart>학과</Depart>
              <Phone>휴대전화</Phone>

              {/* 서버에서 불러온 유저 정보 표시 */}
              <StdNumText>{userData.studentId}</StdNumText>

              {/* 비밀번호 수정 가능하게 */}
              {isPwdEditable ? (
                <input 
                  type="password" 
                  value={userData.password} 
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
                  onBlur={handleBlurPwd}
                  autoFocus
                />
              ) : (
                <PwdText onDoubleClick={handleDoubleClickPwd}>
                  {maskPassword(userData.password)} {/* 별표 표시 */}
                </PwdText>
              )}

              {/* 닉네임 수정 가능하게 */}
              {isNickEditable ? (
                <input 
                  type="text" 
                  value={userData.nickname} 
                  onChange={(e) => setUserData({ ...userData, nickname: e.target.value })} 
                  onBlur={handleBlurNick}
                  autoFocus
                />
              ) : (
                <NickText onDoubleClick={handleDoubleClickNick}>{userData.nickname}</NickText>
              )}

              <DepartText>{userData.department}</DepartText>

              {/* 휴대전화 수정 가능하게 */}
              {isPhoneEditable ? (
                <input 
                  type="text" 
                  value={userData.phone} 
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })} 
                  onBlur={handleBlurPhone}
                  autoFocus
                />
              ) : (
                <PhoneText onDoubleClick={handleDoubleClickPhone}>{userData.phone}</PhoneText>
              )}
            </OverlapGroup>
          </Person>
          <TextWrapper>{userData.nickname} 님
            <ImageUploader 
              defaultImage={require('../img/duk_img.png')} // 기본 이미지 경로
              className="myPageProfileImage" // 추가 클래스 이름 (스타일 지정 시 활용)
            />
          </TextWrapper>

          <TextWrapper2>21학번</TextWrapper2>
          <TextWrapper5>개인정보</TextWrapper5>
          
          <Link to="/MyLikes">
            <TextWrapper4>
              나의 관심 게시물 <img src={goButton} alt="MyLikes" className="GoImage"/>
            </TextWrapper4>
          </Link>
          
          <Link to="/MyPost">
            <TextWrapper6>
              내가 작성한 게시물 <img src={goButton} alt="MyPost" className="GoImage"/>
            </TextWrapper6>
          </Link>

          {/* 로그아웃 버튼 */}
          <LogoutText onClick={openLogoutModal}>로그아웃</LogoutText>
          <LogoutButton isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />

          {/* 계정 탈퇴 버튼 */}
          <AccountDeletionText onClick={openDeleteModal}>계정 탈퇴하기</AccountDeletionText>
          <DeleteAcButton isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />

          <BottomBox>
            <Footer />
          </BottomBox>
          
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
};

export default MyPage;
