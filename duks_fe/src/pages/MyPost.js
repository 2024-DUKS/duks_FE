import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as I from '../styles/MyPostStyle'; // 스타일을 I로 가져옴
import Footer from '../components/Footer';
import backButton from '../img/backButton.png'; // 백버튼 이미지 가져오기

const MyPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedType, setSelectedType] = useState(() => {
    const savedSelectedType = sessionStorage.getItem('selectedType');
    return savedSelectedType || 'offer';
  });

  // 페이지 로드 시 카테고리별로 내 게시물 가져오기
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const endpoint = selectedType === 'offer' ? 'offer' : 'request'; // 선택된 타입에 따라 엔드포인트 설정
        const response = await axios.get(`http://localhost:5000/api/posts/myposts/${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setPosts(response.data);
        sessionStorage.setItem('selectedType', selectedType); // 선택한 타입을 sessionStorage에 저장
      } catch (error) {
        console.error('내 게시물을 불러오는 중 오류 발생:', error);
      }
    };

    fetchMyPosts();
  }, [selectedType]); // selectedType이 변경될 때마다 호출

  // 가격 표시 함수
  const renderPrice = (price) => {
    if (price === '0') {
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

    return '방금 전';
  };

  return (
    <I.BackgroundWrapper>
      <I.MyPageContainer>
        <I.InnerDiv>
          <I.TopBox>
            <I.BackButton onClick={() => navigate(-1)}>
              <img src={backButton} alt="BackButton" />
            </I.BackButton>
            <I.PageTitle>내가 작성한 게시물</I.PageTitle>
          </I.TopBox>

          {/* 유형 버튼 영역 */}
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

          {/* 게시물 목록 */}
          <I.PostListBox>
            {posts.length > 0 ? (
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
              <I.NoResultsMessage>게시물이 없습니다.</I.NoResultsMessage>
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

export default MyPost;
