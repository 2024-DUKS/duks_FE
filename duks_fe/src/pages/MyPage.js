import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import axios from 'axios'; 
=======
import axios from 'axios'; // axios import 추가
>>>>>>> fa563010bc3fa78434520ff81ef187a763ea0231
import { Link, useNavigate } from 'react-router-dom';
import { 
  BackgroundWrapper, MyPageContainer, InnerDiv,  
  TextWrapper, TextWrapper2, TextWrapper4, TextWrapper5,  
  Person, OverlapGroup, TopBox, BottomBox, 
  StdNum, Pwd, Nick, Depart, Phone,
  StdNumText, PwdText, NickText, DepartText, PhoneText, 
  LogoutText, AccountDeletionText, 
<<<<<<< HEAD
  BackButton, PageTitle, TextWrapper6, TextWrapper7
=======
  BackButton, PageTitle, TextWrapper6
>>>>>>> fa563010bc3fa78434520ff81ef187a763ea0231
} from '../styles/MyPageStyle'; 

import ImageUploader from '../components/ImageUpLoader';
import Footer from '../components/Footer';
import LogoutButton from '../components/LogoutButton';
import goButton from '../img/goButton.png';
import DeleteAcButton from '../components/DeleteAcButton';
<<<<<<< HEAD
import backButton from '../img/backButton.png';

const MyPage = () => {
  const navigate = useNavigate();
=======
import backButton from '../img/backButton.png'; // 백버튼 이미지 가져오기

const MyPage = () => {
  const navigate = useNavigate();
  // 유저 정보를 저장할 상태
>>>>>>> fa563010bc3fa78434520ff81ef187a763ea0231
  const [userData, setUserData] = useState({
    studentId: '',
    password: '',
    nickname: '',
    department: '',
    phone: ''
  });

<<<<<<< HEAD
  /*


  // 로그아웃 처리 (모달에서 실행)
  const handleLogout = () => {
    // 쿠키 삭제
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('authToken'); // 로컬 스토리지에서 토큰 삭제
    closeLogoutModal(); // 모달 닫기
    navigate('/join'); // join 페이지로 이동
  };

  */

=======
>>>>>>> fa563010bc3fa78434520ff81ef187a763ea0231
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // 로그아웃 모달 열기/닫기 함수 추가
  const openLogoutModal = () => setLogoutModalOpen(true);
  const closeLogoutModal = () => setLogoutModalOpen(false);

  // 계정 탈퇴 모달 열기/닫기 함수 추가 (실제 동작은 로그아웃)
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

<<<<<<< HEAD
  // 로그아웃 처리 (모달에서 실행)
  const handleLogout = () => {
    // 쿠키 삭제
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('authToken'); // 로컬 스토리지에서 토큰 삭제
    closeLogoutModal(); // 모달 닫기
    navigate('/join'); // join 페이지로 이동
  };
  
  const [isPwdEditable, setPwdEditable] = useState(false);
  const [isPhoneEditable, setPhoneEditable] = useState(false);
  const [isNickEditable, setNickEditable] = useState(false);

  const handleDoubleClickPwd = () => setPwdEditable(true);
  const handleDoubleClickPhone = () => setPhoneEditable(true);
  const handleDoubleClickNick = () => setNickEditable(true);

  const handleBlurPwd = () => setPwdEditable(false);
  const handleBlurPhone = () => setPhoneEditable(false);
  const handleBlurNick = () => setNickEditable(false);

=======
  // 유저 정보를 불러오는 함수
>>>>>>> fa563010bc3fa78434520ff81ef187a763ea0231
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const maskPassword = (password) => {
<<<<<<< HEAD
    return '*'.repeat(Math.min(password.length, 10));
=======
    return '*'.repeat(Math.min(password.length, 10)); 
  };

  // 로그아웃 처리 (모달에서 실행)
  const handleLogout = () => {
    // 쿠키 삭제
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('authToken'); // 로컬 스토리지에서 토큰 삭제
    closeLogoutModal(); // 모달 닫기
    navigate('/join'); // join 페이지로 이동
>>>>>>> fa563010bc3fa78434520ff81ef187a763ea0231
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
<<<<<<< HEAD
          <TextWrapper>{userData.nickname} 님
            <ImageUploader 
              defaultImage={require('../img/duk_img.png')} 
              className="myPageProfileImage" 
            />
          </TextWrapper>
          <TextWrapper2>{String(userData.studentId).slice(2, 4)}학번</TextWrapper2>
          <TextWrapper5>개인정보</TextWrapper5>
=======
>>>>>>> fa563010bc3fa78434520ff81ef187a763ea0231
          <Person>  
            <OverlapGroup>
              <StdNum>학번</StdNum>
              <Pwd>비밀번호</Pwd>
              <Nick>닉네임</Nick>
              <Depart>학과</Depart>
              <Phone>휴대전화</Phone>

              <StdNumText>{userData.studentId}</StdNumText>
<<<<<<< HEAD

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
                  {maskPassword(userData.password)}
                </PwdText>
              )}

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

          <a href="https://www.duksung.ac.kr" target="_blank" rel="noopener noreferrer">
            <TextWrapper7>
              덕성여자대학교 바로가기 <img src={goButton} alt="MyPost" className="GoImage"/>
            </TextWrapper7>
          </a>
=======
              <PwdText>{maskPassword(userData.password)}</PwdText>
              <NickText>{userData.nickname}</NickText>
              <DepartText>{userData.department}</DepartText>
              <PhoneText>{userData.phone}</PhoneText>
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
>>>>>>> fa563010bc3fa78434520ff81ef187a763ea0231

          {/* 로그아웃 모달을 여는 버튼 */}
          <LogoutText onClick={openLogoutModal}>로그아웃</LogoutText>
          <LogoutButton 
            isOpen={isLogoutModalOpen} 
            onClose={closeLogoutModal} 
            onLogout={handleLogout}  // 로그아웃 함수 전달
          />

          {/* 계정 탈퇴 모달을 여는 버튼 */}
          <AccountDeletionText onClick={openDeleteModal}>계정 탈퇴하기</AccountDeletionText>
          <DeleteAcButton 
            isOpen={isDeleteModalOpen} 
            onClose={closeDeleteModal} 
            onLogout={handleLogout}  // 탈퇴 모달의 "탈퇴" 버튼도 실제로는 로그아웃 처리
          />

          <BottomBox>
            <Footer />
          </BottomBox>
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
};

export default MyPage;
