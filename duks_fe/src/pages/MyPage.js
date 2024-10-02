import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { 
  BackgroundWrapper, MyPageContainer, InnerDiv,  
  TextWrapper, TextWrapper2, TextWrapper4, TextWrapper5,  
  Person, OverlapGroup, TopBox, BottomBox, 
  StdNum, Pwd, Nick, Depart, Phone,
  StdNumText, PwdText, NickText, DepartText, PhoneText, 
  LogoutText, AccountDeletionText, 
} from '../styles/MyPageStyle'; 

import ImageUploader from '../components/ImageUpLoader';
import Footer from '../components/Footer'
import LogoutButton from '../components/LogoutButton';
import goButton from '../img/goButton.png';
import DeleteAcButton from '../components/DeleteAcButton';

const MyPage = () => {
  const [isLoadedMenu, setIsLoadedMenu] = useState(false);
  const [isLoadedArrow, setIsLoadedArrow] = useState(false);
  const [isLoadedProfile, setIsLoadedProfile] = useState(false);

  // 모달 상태
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); // 로그아웃 모달 상태
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // 계정 탈퇴 모달 상태

  // 모달 열기/닫기 함수
  const openLogoutModal = () => setLogoutModalOpen(true);
  const closeLogoutModal = () => setLogoutModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox>
            <Link to="/prePage">이전 화면 돌아가기 버튼 및 메뉴 버튼</Link>
          </TopBox>
          
          <Person>  
            <OverlapGroup>
              <StdNum>학번</StdNum>
              <Pwd>비밀번호</Pwd>
              <Nick>닉네임</Nick>
              <Depart>학과</Depart>
              <Phone>휴대전화</Phone>

              <StdNumText>20221234</StdNumText>
              <PwdText>***********</PwdText>
              <NickText>덕성오리</NickText>
              <DepartText>IT</DepartText>
              <PhoneText>010-1234-0382</PhoneText>
            </OverlapGroup>
          </Person>
          <TextWrapper>덕성오리 님
          <ImageUploader 
                defaultImage={require('../img/duk_img.png')} // 기본 이미지 경로
                className="myPageProfileImage" // 추가 클래스 이름 (스타일 지정 시 활용)
            />
          </TextWrapper>

          <TextWrapper2>21학번</TextWrapper2>
          <TextWrapper5>개인정보</TextWrapper5>
          <TextWrapper4>포트폴리오
            <Link to="/Card">
              <img src={goButton} alt="Card" className="GoImage"/>
            </Link>
          </TextWrapper4>

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
