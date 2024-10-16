import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ducky from '../img/ducky.png';
import broccoli from '../img/broccoli.png';
import searchIconImage from '../img/searchIcon.png';
import { useLocation } from 'react-router-dom'; /*추가1*/
import axios from 'axios'; // axios 추가

import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, BottomBox, Title, 
<<<<<<< HEAD
  NoticeBox, NoticeText, NoticeTextWrapper, NoticeImage, HotBox, HotTitle, HeartCount, HotImage,
=======
  NoticeBox, Notice, NoticeImage, HotBox, HotTitle, HeartCount, HotImage,
>>>>>>> fa563010bc3fa78434520ff81ef187a763ea0231
  PostListBox, PostItem, ButtonContainer, TypeButton, PostContent, 
  PostInfo, PostDetails, HeartIcon, HeartCount2, PostTitle, PostImage, PostPrice,
  HeartContainer, SearchInput, SearchIcon, SearchContainer, TitleText, PostInfo2
} from '../styles/ArtPageStyle'; 

import Footer from '../components/Footer'

const ArtPage = () => {
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

        const encodedCategory = encodeURIComponent('아트/디자인 계열');
    
        const response = await axios.get(`http://localhost:5000/api/posts/category/${encodedCategory}?type=${selectedType}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        console.log('서버 응답 데이터:', response.data); // 서버 응답 데이터 확인
    
        const fetchedPosts = response.data.posts.map(post => ({
          ...post,
          likeCount: post.likeCount || 0 // likeCount가 없는 경우 기본값 0 설정
        }));
    
        setPosts(fetchedPosts);
        setTopLikedPosts(response.data.topLikedPosts.map(post => ({
          ...post,
          likeCount: post.likeCount || 0 // likeCount가 없는 경우 기본값 0 설정
        })));
      } catch (error) {
        console.error('데이터를 가져오는 데 실패했습니다.', error);
      }
    };
    

  // 페이지가 로드될 때 세션 스토리지를 초기화(검색기록세션스토리지때문)
  useEffect(() => {
    sessionStorage.removeItem('posts'); // 'posts' 항목 초기화
    sessionStorage.removeItem('searchInput'); // 'searchInput' 항목 초기화
    sessionStorage.removeItem('selectedType');
  }, []);  // 빈 배열을 넣으면 컴포넌트가 처음 로드될 때 한 번만 실행


  // 컴포넌트가 마운트될 때 데이터 fetch
  useEffect(() => {
    fetchData();
  }, [selectedType]); // selectedType이 변경될 때마다 데이터를 새로 fetch

  const navigate = useNavigate();
  // 검색 버튼 클릭 시
  const handleSearchIconClick = (e) => {
    if (!isSearching) {
      // 처음 클릭 시, 검색 입력창만 표시
      setIsSearching(true);
    } 
    else 
    {
      if (searchQuery.length === 0) {
        // 검색어가 비어있으면 !isSearching으로 토글
        setIsSearching(false);
      } 
      else 
      {
        // 검색어가 두 글자 이상일 경우에만 navigate //계열페이지 복제시 수정할부분
        if (searchQuery.length >= 2) {
          navigate("/categsearch", { state: { searchQuery, selectedCateg: "아트/디자인 계열" }});
        } else {
          alert("검색어는 두 글자 이상 입력해 주세요.");
        }
      }
    } 
  };

  // 엔터 키를 눌렀을 때 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchIconClick(); // 엔터가 눌리면 검색 실행
    }
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const location = useLocation();
  const post = location.state;  // Main에서 전달된 post 객체

    // 가격 표시 함수
  const renderPrice = (price) => {
    if (parseInt(price) === 0) {
      return '재능 기부';
    } else {
      return `${price}원`;
    }
  };



  // 시간을 사람이 이해할 수 있는 방식으로 변환하는 함수
  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval}년 전`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval}달 전`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval}일 전`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval}시간 전`;
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval}분 전`;
    }

    return "방금 전";
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
                  onKeyDown={handleKeyDown} // 엔터 키 입력 감지
                />
                <SearchIcon src={searchIconImage} alt="Search Icon" onClick={handleSearchIconClick} />
              </SearchContainer>
            ) : (
              <SearchContainer>
                <Title>아트/디자인</Title>
                <SearchIcon src={searchIconImage} alt="Search Icon" onClick={handleSearchIconClick} />
              </SearchContainer>
            )}
          </TopBox>
          <NoticeBox>
<<<<<<< HEAD
            <NoticeImage src={ducky} alt="Ducky" />
            <NoticeTextWrapper>
              <NoticeText>이 게시판은 동양화전공, 서양화전공, 실내디자인전공, 시각디자인전공, 텍스타일디자인전공의 게시판입니다.</NoticeText>
            </NoticeTextWrapper>
=======
              <NoticeImage src={ducky} alt="Ducky" />
              <Notice>notice</Notice>
>>>>>>> fa563010bc3fa78434520ff81ef187a763ea0231
          </NoticeBox>
          <HotBox> 
            {topLikedPosts.map((post) => (
              <Link to={`/postdetail/${post.id}`} style={{ textDecoration: 'none' }} key={post.id}>
                <HotTitle>
                  <HotImage src={broccoli} alt="broccoli" />
                  <TitleText>{post.title}</TitleText>
                  <HeartCount>♥ {post.likeCount || 0}</HeartCount> {/* NaN 또는 undefined 방지 */}
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
    <Link to={`/postdetail/${post.id}`} style={{ textDecoration: 'none' }} key={post.id}> {/* ID를 URL에 포함 */}
      <PostItem>
        <PostImage src={`http://localhost:5000${post.image_url.split(',')[0]}`} alt={post.title} />
        <PostContent>
          <PostInfo>
            <PostPrice>{renderPrice(post.price)}</PostPrice>
            <PostTitle>{post.title}</PostTitle>         
          </PostInfo>
          <PostInfo2>
            <PostDetails>{post.nickname} | {timeSince(post.created_at)}</PostDetails>
            <HeartContainer>
              <HeartIcon>♥</HeartIcon>
              <HeartCount2>{post.likeCount || 0}</HeartCount2>
            </HeartContainer>
          </PostInfo2>
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
export default ArtPage;