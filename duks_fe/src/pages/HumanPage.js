import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios 추가

import ducky from '../img/ducky.png';
import broccoli from '../img/broccoli.png';
import searchIconImage from '../img/searchIcon.png';

// 임시 이미지 경로
import sampleImage1 from '../img/sample1.png';  
import sampleImage2 from '../img/sample2.png';
import sampleImage3 from '../img/sample3.png';

import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, BottomBox, Title, 
  NoticeBox, Notice, NoticeImage, HotBox, HotTitle, HeartCount, HotImage,
  PostListBox, PostItem, ButtonContainer, CategoryButton, PostContent, 
  PostInfo, PostDetails, HeartIcon, HeartCount2, PostTitle, PostImage, PostPrice,
  HeartContainer, SearchInput, SearchIcon, SearchContainer
} from '../styles/HumanPageStyle'; 

import Footer from '../components/Footer'
const HumanPage = () => {
  // 게시물 상태 초기화
  const [postList, setPostList] = useState([]);
  // 현재 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState('해드립니다');
   // 검색 상태 관리
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 선택된 카테고리에 해당하는 게시물만 필터링
  const filteredPosts = postList.filter(post => 
    post.category === selectedCategory && 
    post.title.includes(searchQuery) // 제목에 검색어 포함
  );

  // 검색창 열기/닫기 핸들러
  const handleSearchIconClick = () => {
    setIsSearching(!isSearching); // 검색 상태를 토글
    setSearchQuery(''); // 검색창 초기화
  };


  // 검색 입력 변화 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 게시물 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts'); // API URL 수정
        console.log('응답을 성공적으로 받았습니다:', response.data); // 응답 데이터 출력
        setPostList(response.data); // 서버에서 받은 데이터로 상태 업데이트
      } catch (error) {
        console.error('Error fetching posts:', error.message); // 에러 메시지 출력
        console.log('에러 발생 시 HTTP 응답 상태 코드:', error.response?.status); // HTTP 상태 코드 출력
        console.log('에러 발생 시 응답 데이터:', error.response?.data); // 응답 데이터 출력
      }
    };

    fetchPosts();
  }, []);

  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox>
            {/* 검색 상태에 따라 Title 또는 검색창 + 아이콘을 표시 */}
            {isSearching ? (
              <SearchContainer>
                <SearchInput 
                  type="text"
                  placeholder="검색어를 입력하세요..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <SearchIcon src={searchIconImage} alt="Search Icon" onClick={handleSearchIconClick} />
              </SearchContainer>
            ) : (
              <SearchContainer>
                <Title>인문학</Title>
                <SearchIcon src={searchIconImage} alt="Search Icon" onClick={handleSearchIconClick} />
              </SearchContainer>
            )}
          </TopBox>
          <NoticeBox>
              <NoticeImage src={ducky} alt="Ducky" />
              <Notice>notice</Notice>
          </NoticeBox>
          <HotBox> 
            <Link to="/post1" style={{ textDecoration: 'none' }}> {/* 게시물 ID를 경로에 포함 */}
              <HotTitle>
                <HotImage src={broccoli} alt="broccoli" />인기글 1 제목
                <HeartCount>♥ 30</HeartCount>
              </HotTitle>
            </Link>
            <Link to="/post2" style={{ textDecoration: 'none' }}> 
              <HotTitle>
                <HotImage src={broccoli} alt="broccoli" />인기글 2 제목
                <HeartCount>♥ 28</HeartCount>
              </HotTitle>
            </Link>
            <Link to="/post3" style={{ textDecoration: 'none' }}> 
              <HotTitle>
                <HotImage src={broccoli} alt="broccoli" />인기글 3 제목
                <HeartCount>♥ 25</HeartCount>
              </HotTitle>
            </Link>
          </HotBox>

          {/* 카테고리 버튼 */}
          <ButtonContainer>
            <CategoryButton 
              selected={selectedCategory === '해드립니다'}
              onClick={() => setSelectedCategory('해드립니다')}
            >
              해드립니다
            </CategoryButton>
            <CategoryButton 
              selected={selectedCategory === '해주세요'}
              onClick={() => setSelectedCategory('해주세요')}
            >
              해주세요
            </CategoryButton>
          </ButtonContainer>

          {/* 게시물 리스트 */}
          <PostListBox>
            {filteredPosts.map(post => (
              <Link to={`/post/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
                <PostItem>
                  <PostImage src={post.image_url} alt={post.title} />
                  <PostContent>
                    <PostInfo>
                      <PostPrice>{post.price}</PostPrice>
                      <PostTitle>{post.title}</PostTitle>
                      <PostDetails>{post.nickname} | {post.time}</PostDetails>
                    </PostInfo>
                    <HeartContainer>
                      <HeartIcon>♥</HeartIcon>
                      <HeartCount2>{post.hearts}</HeartCount2>
                    </HeartContainer>
                  </PostContent>
                </PostItem>
              </Link>
            ))}
          </PostListBox>       
        
          <BottomBox>
            <Footer />
          </BottomBox>
          
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
}
export default HumanPage;


