import React from "react";
import { Link } from "react-router-dom";  // react-router-dom의 Link 컴포넌트 사용
import * as M from "../styles/MainStyle";
import logo from '../img/logo.jpg';
import logo2 from '../img/logo_img.jpg';
import ducky from '../img/ducky.png';
import Footer from '../components/Footer'
import { BottomBox} from '../styles/MainStyle'; 

function Main() {
  return (
    <M.PageWrapper>
      <M.Background>
        <M.MainContainer>
          {/* 상단 로고 부분 */}
          <M.LogoContainer>
            <M.LogoLeft src={logo} alt="Logo" />
            <M.LogoRight src={logo2} alt="Logo2" />
          </M.LogoContainer>

          {/* 로고 아래에 검색창 추가 */}
          <M.SearchContainer>
            <M.SearchIcon>🔍</M.SearchIcon> {/* 돋보기를 문자로 고정 */}
            <M.SearchInput type="text" placeholder=" 글제목, 내용" />
          </M.SearchContainer>

          {/* 아이콘 그리드 */}
          <M.IconGrid>
            <M.IconItem>
              <Link to="/HumanPage">
                <img src={ducky} alt="Icon 1" />
                <span>인문학 계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/SoSciPage">
                <img src={ducky} alt="Icon 2" />
                <span>사회과학 계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/BusiEcoPage">
                <img src={ducky} alt="Icon 3" />
                <span>경영/경제 계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/SciencePage">
                <img src={ducky} alt="Icon 4" />
                <span>자연과학 계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/ComputerPage">
                <img src={ducky} alt="Icon 5" />
                <span>IT 계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/BioPage">
                <img src={ducky} alt="Icon 6" />
                <span>바이오/약학</span>
                <span>계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/ArtPage">
                <img src={ducky} alt="Icon 7" />
                <span>아트/디자인</span>
                <span>계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/EduPage">
                <img src={ducky} alt="Icon 8" />
                <span>교육 계열</span>
              </Link>
            </M.IconItem>
          </M.IconGrid>

          {/* 최신 글 <해드립니다> */}
          <M.SectionTitle>최신글 &lt;해드립니다&gt;</M.SectionTitle>
          <M.PostGrid>
            <M.PostItem>
              <Link to="/post1">
                <M.PostTitle>고민 들어드립니다.</M.PostTitle>
                <M.PostContent>
                  MBTI F 50% T 50% 인간으로 적절하게 공감해드리고 적절하게 해결방안 드립니다.
                </M.PostContent>
              </Link>
            </M.PostItem>
            <M.PostItem>
              <Link to="/post2">
                <M.PostTitle>그림 그려드립니다.</M.PostTitle>
                <M.PostContent>
                  캐릭터/반려동물 사진, 부모님 사진 등 원하는 사진 개성 있게 그려드립니다.
                </M.PostContent>
              </Link>
            </M.PostItem>
          </M.PostGrid>

          {/* 최신 글 <해주세요> */}
          <M.SectionTitle>최신글 &lt;해주세요&gt;</M.SectionTitle>
          <M.PostGrid>
            <M.PostItem>
              <Link to="/post3">
                <M.PostTitle>공모전 팀원 구합니다.(백엔드)</M.PostTitle>
                <M.PostContent>
                  덕성 공모전 팀원 구합니다. 백엔드 담당 줄 아시는 분 구해요.
                </M.PostContent>
              </Link>
            </M.PostItem>
            <M.PostItem>
              <Link to="/post4">
                <M.PostTitle>드럼 가르쳐주실 분 구합니다.</M.PostTitle>
                <M.PostContent>
                  드럼 배우고 싶은데 독학하기는 어렵네요. 드럼 가르쳐주실 분 구합니다.
                </M.PostContent>
              </Link>
            </M.PostItem>
          </M.PostGrid>

          <BottomBox>
            <Footer />
          </BottomBox>
        </M.MainContainer>
      </M.Background>
    </M.PageWrapper>
    
  );
}

export default Main;
