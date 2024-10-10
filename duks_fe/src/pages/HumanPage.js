import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import searchIconImage from '../img/searchIcon.png';
import ducky from '../img/ducky.png';
import broccoli from '../img/broccoli.png';

import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, BottomBox, Title, 
  NoticeBox, Notice, NoticeImage, HotBox, HotTitle, HeartCount, HotImage,
  PostListBox, PostItem, ButtonContainer, TypeButton, PostContent, 
  PostInfo, PostDetails, HeartIcon, HeartCount2, PostTitle, PostImage, PostPrice,
  HeartContainer, SearchInput, SearchIcon, SearchContainer
} from '../styles/HumanPageStyle'; 

import Footer from '../components/Footer'

const HumanPage = () => {
  const [postList, setPostList] = useState([]); // 게시물 데이터 상태 관리
  const [topLikedPosts, setTopLikedPosts] = useState([]); // 인기 게시물 상태 관리
  const [selectedType, setSelectedType] = useState('해드립니다'); // 현재 선택된 타입 상태
  const [isSearching, setIsSearching] = useState(false); // 검색창 상태
  const [searchQuery, setSearchQuery] = useState(''); // 검색 입력 값 관리

  useEffect(() => {
    // 데이터베이스에서 인문학 계열의 게시물 데이터 가져오기
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/category/인문학 계열', {
          headers: {
            'Content-Type': `application/json`
          },
          params: { type: selectedType, searchQuery }, // type 및 searchQuery 파라미터 추가
        });
        
        if (response.status !== 200) {
          throw new Error('응답이 올바르지 않습니다.');
        }
    
        setPostList(response.data.posts);
        setTopLikedPosts(response.data.topLikedPosts.slice(0, 3)); // 인기 게시물 상위 3개만 가져오기
      } catch (error) {
        console.error('게시물 데이터 불러오기 실패:', error.message);
      }
    };
    fetchData();
  }, [selectedType, searchQuery]); // selectedType과 searchQuery가 변경될 때마다 데이터 fetch

  // 검색창 열기/닫기 핸들러
  const handleSearchIconClick = () => {
    setIsSearching(!isSearching); // 검색 상태를 토글
    setSearchQuery(''); // 검색창 초기화
  };

  // 검색 입력 변화 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
              <Notice>공지 사항</Notice>
          </NoticeBox>

          {/* 인기글 박스 */}
          <HotBox> 
            {topLikedPosts.map(post => (
              <Link to={`/posts/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}> 
                <HotTitle>
                  <HotImage src={broccoli} alt="broccoli" />{post.title}
                  <HeartCount>♥ {post.likeCount}</HeartCount>
                </HotTitle>
              </Link>
            ))}
          </HotBox>

          {/* 타입 버튼 */}
          <ButtonContainer>
            <TypeButton 
              selected={selectedType === '해드립니다'}
              onClick={() => setSelectedType('해드립니다')}
            >
              해드립니다
            </TypeButton>
            <TypeButton 
              selected={selectedType === '해주세요'}
              onClick={() => setSelectedType('해주세요')}
            >
              해주세요
            </TypeButton>
          </ButtonContainer>

          {/* 게시물 리스트 */}
          <PostListBox>
            {postList.length > 0 ? (
              postList.map(post => (
                <PostItem key={post.id}>
                  <PostImage src={post.image_url} alt={post.title} /> {/* image_url 사용 */}
                  <PostContent>
                    <PostPrice>{post.price}</PostPrice>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDetails>{post.user_id} | {post.time}</PostDetails>
                    <HeartContainer>
                      <HeartIcon>♥</HeartIcon> {/* 하트 아이콘 */}
                      <HeartCount2>{post.likeCount || 0}</HeartCount2> {/* 하트 수 표시 */}
                    </HeartContainer>
                  </PostContent>
                </PostItem>
              ))
            ) : (
              <p>게시물이 없습니다.</p>
            )}
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


