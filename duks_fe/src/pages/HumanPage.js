import React from 'react';
//import { Link } from 'react-router-dom';

import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox,BottomBox
} from '../styles/HumanPageStyle'; 

import Footer from '../components/Footer'
const HumanPage = () => {
  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox></TopBox>

          <BottomBox>
            <Footer />
          </BottomBox>
          
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
}
export default HumanPage;


