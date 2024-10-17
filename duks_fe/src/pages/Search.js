import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as I from '../styles/SearchStyle'; // 스타일을 I로 가져옴
import searchIconImage from '../img/searchIcon.png'; // 아이콘 이미지 가져오기
import Footer from '../components/Footer'

import backButton from '../img/backButton.png'; //백버튼추가

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = location.state ? location.state.searchQuery : ""; // 검색어 가져오기
  const [posts, setPosts] = useState(() => {
    // 이전 검색 결과가 sessionStorage에 있으면 불러오고, 없으면 빈 배열
    const savedPosts = sessionStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [searchInput, setSearchInput] = useState(() => {
    // sessionStorage에서 검색어 불러오기 (없으면 초기 검색어 사용)
    const savedSearchInput = sessionStorage.getItem('searchInput');
    return savedSearchInput || searchQuery; 
    //return savedSearchInput ? JSON.parse(savedSearchInput) : [];
  });

  const [selectedType, setSelectedType] = useState(() => {
    // sessionStorage에서 선택한 타입 불러오기 (없으면 기본값 'offer')
    const savedSelectedType = sessionStorage.getItem('selectedType');
    return savedSelectedType || 'offer';
  });

  // 페이지가 로드될 때 검색어가 있으면 자동으로 검색 실행
  useEffect(() => {
    if (searchInput.length >= 2) {
      handleSearch();
    }
  }, [searchQuery, selectedType]);

   
  // 검색 아이콘 클릭 시 게시물 가져오기
  const handleSearch = async () => {
    if (searchInput.length < 2){
      alert("검색어는 두 글자 이상 입력해 주세요.");
      return;
    }; // 검색어가 두 글자 이상일 때만 요청
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/search/${selectedType}?keyword=${searchInput}`, {
        headers: {
          'Content-Type': `application/json`,
        },
      });

      // API로부터 받은 데이터 처리
      setPosts(response.data); // 받은 데이터로 상태 업데이트
      //추가
      sessionStorage.setItem('posts', JSON.stringify(response.data)); // 검색 결과를 sessionStorage에 저장
      sessionStorage.setItem('searchInput', searchInput); // 현재 검색어를 sessionStorage에 저장
      sessionStorage.setItem('selectedType', selectedType); // 선택한 타입을 sessionStorage에 저장
    } catch (error) {
      console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 엔터 키를 눌렀을 때 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // 엔터가 눌리면 검색 실행
    }
  };

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
    <I.BackgroundWrapper>
      <I.MyPageContainer>
        <I.InnerDiv>
          <I.TopBox>
            <I.SearchContainer>
              <I.BackButton onClick={() => navigate(-1)}>
                <img src={backButton} alt="BackButton" />
              </I.BackButton>
              <I.SearchInput 
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} // 입력 변화 감지
                onKeyDown={handleKeyDown} // 엔터 키 입력 감지
              />
              <I.SearchIcon src={searchIconImage} alt="Search Icon" onClick={handleSearch}/>
            </I.SearchContainer>
          </I.TopBox>

          <I.ButtonContainer>
            <I.TypeButton 
              selected={selectedType === 'offer'}
              onClick={() => setSelectedType('offer')}
            >
              해드립니다
            </I.TypeButton>
            <I.TypeButton
              selected={selectedType === 'request'}
              onClick={() => setSelectedType('request')}
            >
              해주세요
            </I.TypeButton>
          </I.ButtonContainer>


          <I.PostListBox>
            {posts.length>0 ? (
              posts.map(post => (
                <Link to={`/postdetail/${post.id}`} style={{ textDecoration: 'none' }} key={post.id}>
                  <I.PostItem>
                    <I.PostImage src={`http://localhost:5000${post.image_url.split(',')[0]}`} alt={post.title} />
                    <I.PostContent>
                      <I.PostInfo>
                        <I.PostPrice>{renderPrice(post.price)}</I.PostPrice>
                        <I.PostTitle>{post.title}</I.PostTitle>
                      </I.PostInfo>
                      <I.PostInfo2>
                        <I.PostDetails>{post.nickname} | {timeSince(post.created_at)}</I.PostDetails>            
                        <I.HeartContainer>
                          <I.HeartIcon>♥</I.HeartIcon>
                          <I.HeartCount2>{post.likeCount}</I.HeartCount2>
                        </I.HeartContainer>
                      </I.PostInfo2>
                    </I.PostContent>
                  </I.PostItem>
                </Link>
              ))
            ) : (
              <I.NoResultsMessage>검색결과가 없습니다.</I.NoResultsMessage>           
            )}
          </I.PostListBox>
          <I.BottomBox>
            <Footer />
          </I.BottomBox>       
        </I.InnerDiv>
      </I.MyPageContainer>
    </I.BackgroundWrapper>
  );
}

export default Search;
