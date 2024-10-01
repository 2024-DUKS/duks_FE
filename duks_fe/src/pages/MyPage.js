import React, { useState } from 'react';
import { 
  BackgroundWrapper, MyPageContainer, InnerDiv,  
  TextWrapper, TextWrapper2, TextWrapper4, TextWrapper5,  
  Person, OverlapGroup, TopBox, BottomBox, 

  StdNum, Pwd, Nick, Depart, Phone,
  StdNumText, PwdText, NickText, DepartText, PhoneText, 
  LogoutText, AccountDeletionText, 

  IcMenuImage, ArrowleftImage, ProfileImage
} from '../styles/MyPageStyle'; 

import ImageUploader from '../components/ImageUpLoader';


const MyPage = () => {
  const [isLoadedMenu, setIsLoadedMenu] = useState(false);
  const [isLoadedArrow, setIsLoadedArrow] = useState(false);
  const [isLoadedProfile, setIsLoadedProfile] = useState(false);

  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox>
            <IcMenuImage 
              src={require('../img/ic_menu.png')} 
              onLoad={() => setIsLoadedMenu(true)} // 메뉴 아이콘 로드 후 상태 업데이트
              style={{ display: isLoadedMenu ? 'block' : 'none' }} // 로드 상태에 따라 표시
            />
            <ArrowleftImage 
              src={require('../img/arrowleft.png')} 
              onLoad={() => setIsLoadedArrow(true)} // 화살표 아이콘 로드 후 상태 업데이트
              style={{ display: isLoadedArrow ? 'block' : 'none' }} // 로드 상태에 따라 표시
            />
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
            <ImageUploader /> {/* 이미지 업로드 컴포넌트 추가 */}
          </TextWrapper>

          <TextWrapper2>21학번</TextWrapper2>
          <TextWrapper5>개인정보</TextWrapper5>
          <TextWrapper4>포트폴리오 관리</TextWrapper4>
          <LogoutText>로그아웃</LogoutText>
          <AccountDeletionText>계정 탈퇴하기</AccountDeletionText>

          <BottomBox></BottomBox>
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
};

export default MyPage;