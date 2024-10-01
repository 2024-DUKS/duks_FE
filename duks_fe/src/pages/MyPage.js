import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { 
  //박스들
  BackgroundWrapper, MyPageContainer, InnerDiv,  
  TextWrapper, TextWrapper2, TextWrapper4, TextWrapper5,  
  Person, OverlapGroup, TopBox, BottomBox, 
  //text들
  StdNum, Pwd, Nick, Depart, Phone,
  StdNumText, PwdText, NickText, DepartText, PhoneText, 
  LogoutText, AccountDeletionText, 
} from '../styles/MyPageStyle'; 

  //버튼들
import ImageUploader from '../components/ImageUpLoader';
import Footer from '../components/Footer'
import goButton from '../img/goButton.png';

const MyPage = () => {
  const [isLoadedMenu, setIsLoadedMenu] = useState(false);
  const [isLoadedArrow, setIsLoadedArrow] = useState(false);
  const [isLoadedProfile, setIsLoadedProfile] = useState(false);


  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox>
            <Link to="/prePage">
              이전 화면 돌아가기 버튼 및 메뉴 버튼
              푸터가 있는데 굳이 넣어야 할까?!?!
            </Link>
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
          <TextWrapper4>포트폴리오
            <Link to="/Card">
              <img src={goButton} alt="Card" className="GoImage"/>
            </Link>
          </TextWrapper4>

          <LogoutText>로그아웃</LogoutText>
          <AccountDeletionText>계정 탈퇴하기</AccountDeletionText>

          <BottomBox>
          <Footer />
          </BottomBox>
          
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
};

export default MyPage;