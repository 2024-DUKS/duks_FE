import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ducky from '../img/ducky.png';
import broccoli from '../img/broccoli.png';
import searchIconImage from '../img/searchIcon.png';
import { useLocation } from 'react-router-dom'; /*추가1*/
import axios from 'axios'; // axios 추가



import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, BottomBox, Title, 
  NoticeBox, Notice, NoticeImage, HotBox, HotTitle, HeartCount, HotImage,
  PostListBox, PostItem, ButtonContainer, TypeButton, PostContent, 
  PostInfo, PostDetails, HeartIcon, HeartCount2, PostTitle, PostImage, PostPrice,
  HeartContainer, SearchInput, SearchIcon, SearchContainer
} from '../styles/HumanPageStyle'; 

import Footer from '../components/Footer'

const HumanPage = () => {
  const [posts, setPosts] = useState([]); // 서버에서 가져온 게시물 데이터
  const [topLikedPosts, setTopLikedPosts] = useState([]); // 인기 게시물 데이터
  const [selectedType, setSelectedType] = useState('해드립니다');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

    // 데이터 fetch 함수
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log("토큰:", token);

      const response = await axios.get(`http://localhost:5000/api/posts/category/인문학 계열?type=${selectedType}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setPosts(response.data.posts);
      setTopLikedPosts(response.data.topLikedPosts);
    } catch (error) {
      console.error('데이터를 가져오는 데 실패했습니다.', error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 fetch
  useEffect(() => {
    fetchData();
  }, [selectedType]); // selectedType이 변경될 때마다 데이터를 새로 fetch

  const handleSearchIconClick = () => {
    setIsSearching(!isSearching);
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const location = useLocation();
  const post = location.state;  // Main에서 전달된 post 객체

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
              <Notice>notice</Notice>
          </NoticeBox>
          <HotBox> 
            {topLikedPosts.map((post) => (
              <Link to="/postdetail" state={post} style={{ textDecoration: 'none' }} key={post.id}>
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
            {posts.map(post => (
              <Link to={`/postdetail/${post.id}`} style={{ textDecoration: 'none' }} key={post.id}>
                <PostItem>
                  <PostImage src={`http://localhost:5000${post.image_url.split(',')[0]}`} alt={post.title} /> {/* 첫 번째 이미지 사용 */}
                  <PostContent>
                    <PostInfo>
                      <PostPrice>{post.price}원</PostPrice>
                      <PostTitle>{post.title}</PostTitle>
                      <PostDetails>{post.nickname} | {new Date(post.created_at).toLocaleString()}</PostDetails>
                    </PostInfo>
                    <HeartContainer>
                      <HeartIcon>♥</HeartIcon>
                      <HeartCount2>{post.likeCount}</HeartCount2>
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
