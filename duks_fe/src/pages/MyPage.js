import React, { useState } from 'react';
import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, Overlap, 
  TextWrapper, TextWrapper2, TextWrapper4, TextWrapper5, IconsaxLinear, 
  Person, OverlapGroup, 

  StdNum, Pwd, Nick, Depart, Phone,
  StdNumText, PwdText, NickText, DepartText, PhoneText, 

  LogoutText, 
  AccountDeletionText 

  ,ProfileImage

} from '../styles/MyPageStyle'; // 적절한 경로로 수정하세요


const MyPage = () => {
  const [isLoaded, setIsLoaded] = useState(false); // 이미지를 로드 상태를 관리
  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>          
          <Person>
            <OverlapGroup>
              <StdNum>학번</StdNum>
              <Pwd>비밀전호</Pwd>
              <Nick>닉네임</Nick>
              <Depart>학과</Depart>
              <Phone>전화번호</Phone>

              <StdNumText>20221234</StdNumText>
              <PwdText>***********</PwdText>
              <NickText>덕성오리</NickText>
              <DepartText>IT</DepartText>
              <PhoneText>010-1234-0382</PhoneText>
            </OverlapGroup>
          </Person>
          <TextWrapper>덕성오리 님</TextWrapper>
          <ProfileImage src="../img/duk_img.png" 
                        onLoad={() => setIsLoaded(true)}
          ></ProfileImage>
          <TextWrapper2>21학번</TextWrapper2>
          <TextWrapper5>개인정보</TextWrapper5>
          <TextWrapper4>포트폴리오 관리</TextWrapper4>
          <LogoutText>로그아웃</LogoutText>
          <AccountDeletionText>계정 탈퇴하기</AccountDeletionText>

        </InnerDiv>

      </MyPageContainer>
    </BackgroundWrapper>
  );
};

export default MyPage;
