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

const Card = () => {
  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox></TopBox>

          <OverlapWrapper>
            <Overlap>
              {/* 
              <InputPhoto src="path_to_your_image.jpg" alt="Input" />
              <OverlapGroup /> 
              <TextDiv>사진을 입력해주세요</TextDiv>
              <Image src="path_to_your_image.jpg" alt="Business" />
              */}
          
              <UserName>홍길동</UserName>
              <UserEmail>honghonghon@gmail.com</UserEmail>
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
