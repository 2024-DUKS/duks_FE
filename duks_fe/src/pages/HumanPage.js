import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 
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

import Footer from '../components/Footer';

const HumanPage = () => {
  const [postList, setPostList] = useState([]);
  const [topLikedPosts, setTopLikedPosts] = useState([]);
  const [selectedType, setSelectedType] = useState('해드립니다');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/category/인문학 계열', {
          headers: { 'Content-Type': `application/json` },
          params: { type: selectedType, searchQuery },
        });
        
        console.log('API 응답 데이터:', response.data); // 추가된 코드
        
        if (response.status !== 200) {
          throw new Error('응답이 올바르지 않습니다.');
        }
    
        setPostList(response.data.posts);
        setTopLikedPosts(response.data.topLikedPosts.slice(0, 3));
      } catch (error) {
        console.error('게시물 데이터 불러오기 실패:', error.message);
      }
    };
    
    fetchData();
  }, [selectedType, searchQuery]);

  const handleSearchIconClick = () => {
    setIsSearching(!isSearching);
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <BackgroundWrapper>
      <MyPageContainer>
        <InnerDiv>
          <TopBox>
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

          <HotBox> 
            {topLikedPosts.map(post => (
              <Link key={post.id} to={`/postdetail`} state={post} style={{ textDecoration: 'none', width: '100%' }}>
                <HotTitle>
                  <HotImage src={broccoli} alt="broccoli" />{post.title}
                  <HeartCount>♥ {post.likeCount}</HeartCount>
                </HotTitle>
              </Link>
            ))}
          </HotBox>

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

          <PostListBox>
            {postList.length > 0 ? (
              postList.map(post => (
                <PostItem key={post.id}>
                  <Link to={`/postdetail`} state={post} style={{ textDecoration: 'none', display: 'flex' }}>
                    <PostImage src={post.image_url} alt={post.title} />
                    <PostContent>
                      <PostInfo>
                        <PostPrice>{post.price}원</PostPrice>
                        <PostTitle>{post.title}</PostTitle>
                        <PostDetails>{post.nickname} | {post.created_at}</PostDetails>
                      </PostInfo>
                      <HeartContainer>
                        <HeartIcon>♥</HeartIcon>
                        <HeartCount2>{post.likeCount || 0}</HeartCount2>
                      </HeartContainer>
                    </PostContent>
                  </Link>
                </PostItem>
              ))
            ) : (
              <div>게시물이 없습니다.</div>
            )}
          </PostListBox>

          <BottomBox>
            <Footer />
          </BottomBox>
          
        </InnerDiv>
      </MyPageContainer>
    </BackgroundWrapper>
  );
};

export default HumanPage;

