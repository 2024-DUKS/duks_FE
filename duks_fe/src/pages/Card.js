import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { 
  //푸터 및 기본 틀
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox,BottomBox,

  //명함
  BusinessCard, OverlapWrapper, Overlap, InputPhoto, OverlapGroup,
  TextDiv, Image, UserName, UserEmail, UserAbility, UserCharactor,
} from '../styles/CardStyle'; 

import Footer from '../components/Footer'
import MakeAbilityButton from '../components/MakeAbilityButton';
import MakeChaButton from '../components/MakeChaButton';
import ProfileImageUploader from '../components/ProfileImageUpLoader';

const Card = () => {
  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox></TopBox>

          <OverlapWrapper>
            <Overlap>

              {/*명함 프로필 업로드 컴포넌트*/}
              <ProfileImageUploader />
              <UserName>홍길동</UserName>
              <UserEmail>010-1234-5678</UserEmail>
              <div>
                <UserAbility>Ability
                  <div className="button-container">
                    <MakeAbilityButton />
                    <MakeAbilityButton />
                    <MakeAbilityButton />
                  </div>
                </UserAbility>
              </div>

              <div>
                <UserCharactor>User Character
                  <div className="button-container">
                    <MakeChaButton />
                    <MakeChaButton />
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
