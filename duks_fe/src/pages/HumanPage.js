import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ducky from '../img/ducky.png';
import broccoli from '../img/broccoli.png';

// 임시 이미지 경로
import sampleImage1 from '../img/sample1.png';  
import sampleImage2 from '../img/sample2.png';
import sampleImage3 from '../img/sample3.png';
import searchIconImage from '../img/searchIcon.png';

import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, BottomBox, Title, 
  NoticeBox, Notice, NoticeImage, HotBox, HotTitle, HeartCount, HotImage,
  PostListBox, PostItem, ButtonContainer, CategoryButton, PostContent, 
  PostInfo, PostDetails, HeartIcon, HeartCount2, PostTitle, PostImage, PostPrice,
  HeartContainer, SearchInput, SearchIcon, SearchContainer
} from '../styles/HumanPageStyle'; 

import Footer from '../components/Footer'
const HumanPage = () => {
  //예시 게시물 데이터
  const postList = [
    { id: 1, category: '해드립니다', image: sampleImage1, price: '10000원', title: '그림 그려 드립니다!', author: '닉네임', time: '5분 전', hearts: 7 },
    { id: 2, category: '해드립니다', image: sampleImage2, price: '26000원', title: '그림 잘 그리는 방법 알려드립니다', author: '스타듀밸리', time: '30분 전', hearts: 7 },
    { id: 3, category: '해드립니다', image: sampleImage3, price: '50000원', title: '디자인 해드립니다', author: '디자인해줌', time: '2시간 전', hearts: 4 },
    { id: 4, category: '해주세요', image: sampleImage1, price: '15000원', title: '귀여운 캐릭커쳐 그려 드립니다!', author: '고라파덕', time: '17시간 전', hearts: 11 },
    { id: 5, category: '해주세요', image: sampleImage2, price: '500원', title: '갬성 낚서 해드립니다', author: '오리팩팩', time: '3일 전', hearts: 5 },
    { id: 6, category: '해주세요', image: sampleImage2, price: '500원', title: '갬성 낚서 해드립니다', author: '오리팩팩', time: '3일 전', hearts: 5 },
    { id: 7, category: '해드립니다', image: sampleImage2, price: '500원', title: '갬성 낚서 해드립니다', author: '오리팩팩', time: '3일 전', hearts: 5 },
    { id: 8, category: '해주세요', image: sampleImage2, price: '500원', title: '갬성 낚서 해드립니다', author: '오리팩팩', time: '3일 전', hearts: 5 },
    { id: 9, category: '해드립니다', image: sampleImage2, price: '500원', title: '갬성 낚서 해드립니다', author: '오리팩팩', time: '3일 전', hearts: 5 },
    { id: 10, category: '해주세요', image: sampleImage2, price: '500원', title: '갬성 낚서 해드립니다', author: '오리팩팩', time: '3일 전', hearts: 5 },
    { id: 11, category: '해드립니다', image: sampleImage2, price: '500원', title: '갬성 낚서 해드립니다', author: '오리팩팩', time: '3일 전', hearts: 5 },
    { id: 12, category: '해주세요', image: sampleImage2, price: '500원', title: '갬성 낚서 해드립니다', author: '오리팩팩', time: '3일 전', hearts: 5 }
  ];
  // 현재 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState('해드립니다');

  // 선택된 카테고리에 해당하는 게시물만 필터링
  const filteredPosts = postList.filter(post => post.category === selectedCategory);

   // 검색 상태 관리
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
                  <PostImage src={post.image} alt={post.title} />
                  <PostContent>
                    <PostInfo>
                      <PostPrice>{post.price}</PostPrice>
                      <PostTitle>{post.title}</PostTitle>
                      <PostDetails>{post.author} | {post.time}</PostDetails>
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


