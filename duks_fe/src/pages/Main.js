import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";  // react-router-dom의 Link 컴포넌트 사용
import * as M from "../styles/MainStyle";
import logo from '../img/logo.jpg';
import logo2 from '../img/logo_img.jpg';
import book from '../img/book.png';
import social from '../img/social.png';
import economics from '../img/economics.png';
import Natural from '../img/Natural.png';
import IT from '../img/IT.png';
import bio from '../img/bio.png';
import art from '../img/art.png';
import teach from '../img/teach.png';
import Footer from '../components/Footer'
import { BottomBox} from '../styles/MainStyle'; 
import { useLocation } from 'react-router-dom';  // useLocation 추가
import axios from 'axios';  // axios 추가

function Main() {
  const location = useLocation();
  const newPost = location.state;

  const [posts, setPosts] = useState([]); // 빈 배열로 초기화

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 버튼 클릭 시
  const handleSearchSubmit = (e) => {
    if (searchQuery.length >= 2) {
      navigate("/search", { state: { searchQuery } });
    } else {
      alert("검색어는 두 글자 이상 입력해 주세요.");
    }
  };

  


  // 게시글 데이터를 서버에서 가져오는 함수
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log("토큰:", token);
  
        const response = await axios.get('http://localhost:5000/api/posts/main', {
          headers: {
            'Content-Type': `application/json`,
            'Authorization': `Bearer ${token}`,
          },
        });
         // API로 가져온 데이터 확인
      console.log("가져온 게시물 데이터:", response.data);

      // 데이터가 제대로 왔다면 상태 업데이트
      const allPosts = response.data.offerPosts.concat(response.data.requestPosts);
      console.log("최신 게시물:", allPosts); // 이 로그로 전체 게시물 확인
      setPosts(allPosts);
    } catch (error) {
      console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
    }
    };
    fetchPosts();
  }, [newPost]);
  

  // newPost가 있을 경우 posts 배열 업데이트
  useEffect(() => {
    if (newPost) {
      console.log("새로운 게시물:", newPost);  // 새 게시물이 제대로 전달되는지 확인
      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        updatedPosts.push(newPost);
        return updatedPosts;
      });
    }
  }, [newPost]);

  // posts가 배열이 아닌 경우 로딩 메시지 출력
  if (!Array.isArray(posts)) {
    return <div>게시물 데이터를 불러오는 중입니다...</div>;
  }

  // '해드립니다'와 '해주세요' 게시물을 각각 저장할 배열
  const helpPosts = posts.filter(post => post.type === '해드립니다'); // '해드립니다' 게시물 필터링
  const requestPosts = posts.filter(post => post.type === '해주세요'); // '해주세요' 게시물 필터링

  console.log("해드립니다 게시물:", helpPosts); // 이 로그로 확인
  console.log("해주세요 게시물:", requestPosts); // 이 로그로 확인

  return (
    <M.PageWrapper className="main-page-wrapper">
      <M.Background>
        <M.MainContainer>
          {/* 상단 로고 부분 */}
          <M.LogoContainer>
            <M.LogoLeft src={logo} alt="Logo" />
            <M.LogoRight src={logo2} alt="Logo2" />
          </M.LogoContainer>

          {/* 로고 아래에 검색창 추가 */}
          <M.SearchContainer>
          <M.SearchInput
              type="text"
              placeholder="글제목, 내용"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <M.SearchIcon onClick={handleSearchSubmit}>🔍</M.SearchIcon>
          </M.SearchContainer>

          {/* 아이콘 그리드 */}
          <M.IconGrid>
            <M.IconItem>
              <Link to="/HumanPage">
                <img src={book} alt="Icon 1" />
                <span>인문학 계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/SoSciPage">
                <img src={social} alt="Icon 2" />
                <span>사회과학 계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/BusiEcoPage">
                <img src={economics} alt="Icon 3" />
                <span>경영/경제 계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/SciencePage">
                <img src={Natural} alt="Icon 4" />
                <span>자연과학 계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/ComputerPage">
                <img src={IT} alt="Icon 5" />
                <span>IT 계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/BioPage">
                <img src={bio} alt="Icon 6" />
                <span>바이오/약학</span>
                <span>계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/ArtPage">
                <img src={art} alt="Icon 7" />
                <span>아트/디자인</span>
                <span>계열</span>
              </Link>
            </M.IconItem>
            <M.IconItem>
              <Link to="/EduPage">
                <img src={teach} alt="Icon 8" />
                <span>교육 계열</span>
              </Link>
            </M.IconItem>
          </M.IconGrid>

           {/* 최신 글 <해드립니다> */}
          <M.SectionTitle>최신글 &lt;해드립니다&gt;</M.SectionTitle>
          <M.PostGrid>
            {helpPosts && helpPosts.length > 0 ? (
              helpPosts.slice(0, 2).map((post) => (
                <Link to={`/postdetail/${post.id}`} style={{ textDecoration: 'none' }} key={post.id}> {/* ID를 URL에 포함 */}
                  <M.PostItem>
                    <M.PostTitle>{post.title}</M.PostTitle>
                    <M.PostContent>{post.content.slice(0, 100)}</M.PostContent>
                  </M.PostItem>
                </Link>
              ))
        ) : (
        <p>해드립니다 게시물이 없습니다.</p>
        )}
        </M.PostGrid>

            {/* 최신 글 <해주세요> */}
              <M.SectionTitle>최신글 &lt;해주세요&gt;</M.SectionTitle>
                <M.PostGrid>
                  {requestPosts && requestPosts.length > 0 ? (
                    requestPosts.slice(0, 2).map((post) => (
                      <Link to={`/postdetail/${post.id}`} style={{ textDecoration: 'none' }} key={post.id}> {/* ID를 URL에 포함 */}
                        <M.PostItem>
                          <M.PostTitle>{post.title.slice(0, 15)}</M.PostTitle>
                          <M.PostContent>{post.content.slice(0, 100)}</M.PostContent>
                        </M.PostItem>
                      </Link>
                    ))
                ) : (
                <p>해주세요 게시물이 없습니다.</p>
                  )}
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
