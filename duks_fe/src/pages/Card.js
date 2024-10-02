import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { 
  //푸터 및 기본 틀
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox,BottomBox,

  //명함
  BusinessCard, OverlapWrapper, Overlap, InputPhoto, OverlapGroup,
  TextDiv, Image, UserName, UserEmail, UserAbility, UserCharactor,
  MakeAbility, TextWrapper, Character1, Character1Instance, CharacterInstance, 
  SingleOptionSelect
} from '../styles/CardStyle'; 

import Footer from '../components/Footer'
const Card = () => {
  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox></TopBox>
          <BusinessCard>
      <OverlapWrapper>
        <TopBox />
        <Overlap>
          <InputPhoto src="path_to_your_image.jpg" alt="Input" />
          <OverlapGroup />
          <TextDiv>사진을 입력해주세요</TextDiv>
          <Image src="path_to_your_image.jpg" alt="Business" />
          <UserName>홍길동</UserName>
          <UserEmail>honghonghon@gmail.com</UserEmail>
          <UserAbility>User Ability</UserAbility>
          <UserCharactor>User Character</UserCharactor>
          <MakeAbility>Ability</MakeAbility>
            <TextWrapper top={0}>Text Wrapper 2</TextWrapper>
            <TextWrapper top={23}>Text Wrapper 3</TextWrapper>
            <TextWrapper top={46}>Text Wrapper 4</TextWrapper>

            <SingleOptionSelect top={394}>Select 1</SingleOptionSelect>
            <SingleOptionSelect top={371}>Select 2</SingleOptionSelect>
            <SingleOptionSelect top={417}>Select 3</SingleOptionSelect>


          <Character1>Character 1</Character1>
            <CharacterInstance>Character Instance</CharacterInstance>
            <Character1Instance>Character 1 Instance</Character1Instance>

        </Overlap>
        <BottomBox />
      </OverlapWrapper>
    </BusinessCard>
          <BottomBox>
            <Footer />
          </BottomBox>
          
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
}
export default Card;
