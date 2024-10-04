import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // useNavigate 함수 불러오기
import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, CloseButton, BottomBox, BoardName, ProfileInfo, PostTitle, PostDate, PostContent, PostImageWrapper, PostImage, CommentSection, CommentInputWrapper, CommentInput, SubmitButton, InfoContainer, ArrowButton, PriceWrapper, LikeButtonWrapper
} from '../styles/PostDetailStyle';    
import Footer from '../components/Footer';

const PostDetail = () => {
  const location = useLocation();
  const post = location.state;
  const navigate = useNavigate(); // useNavigate 함수 사용
  const [userInfo, setUserInfo] = useState({ nickname: '', department: '', profileImage: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스 상태 추가
  const [isLiked, setIsLiked] = useState(false); // 좋아요 여부를 상태로 관리
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수 상태 관리

  useEffect(() => {
    // 로컬스토리지에서 사용자 정보 가져오기
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // 데이터가 없을 경우 기본값 설정
  if (!post) {
    return <div>게시물 데이터를 불러올 수 없습니다.</div>;
  }

  const handleBack = () => {
    navigate(-1); // 뒤로 가기 기능
  }

  const handleProfileClick = () => {
    navigate('/card');  // 프로필 클릭 시 Card로 이동
  };

  // 이미지 이전 버튼 클릭 시
  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? post.files.length - 1 : prevIndex - 1
    );
  };

  // 이미지 다음 버튼 클릭 시
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === post.files.length - 1 ? 0 : prevIndex + 1
    );
  };

  // description에서 줄 바꿈 처리
  const renderDescription = () => {
    return post.description.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br /> {/* 각 줄 사이에 줄 바꿈 */}
      </span>
    ));
  };

  // 가격 표시 함수
  const renderPrice = () => {
    if (post.price === '0') {
      return '재능 기부';
    } else {
      return `가격: ${post.price}원`;
    }
  };

  // 좋아요 버튼 클릭 시
  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1); // 좋아요 취소
    } else {
      setLikeCount(likeCount + 1); // 좋아요 추가
    }
    setIsLiked(!isLiked); // 상태 토글
  };


  return (
    <div className="postdetail-page-wrapper">
      <BackgroundWrapper>
        <MyPageContainer>
          <InnerDiv>
            <TopBox>
            <CloseButton onClick={handleBack}>X</CloseButton> {/* X 버튼 클릭 시 handleBack 함수 호출 */}
            </TopBox>

            {/* 프로필 섹션 */}
            <ProfileInfo onClick={handleProfileClick}> {/* 클릭 시 Card로 이동 */}
              <img src={userInfo.profileImage || '/default-profile.png'} alt="Profile" />
              <div>
                <p>{userInfo.nickname || '익명'}</p>
                <p>{userInfo.department || '학과 정보 없음'}</p>
              </div>
            </ProfileInfo>

            <PostTitle>{post.title || "제목이 없습니다"}</PostTitle> {/* 게시물 제목 */}

             {/* 카테고리와 날짜를 한 줄로 배치 */}
             <InfoContainer>
              <BoardName>{post.category || "카테고리 없음"}</BoardName>
              <PostDate>{post.date || "작성 날짜 없음"}</PostDate>
            </InfoContainer>

            {/* 게시물 내용에 줄 바꿈 반영 */} 
            <PostContent>{renderDescription()}</PostContent>

            {/* 이미지 슬라이더 부분 */}
            {post.files && post.files.length > 0 && (
            <PostImageWrapper>
              <ArrowButton onClick={previousImage}>&lt;</ArrowButton>
              <PostImage src={post.files[currentImageIndex]} alt={`post-${currentImageIndex}`} />
              <ArrowButton onClick={nextImage}>&gt;</ArrowButton>
             </PostImageWrapper>
            )}

            {/* 가격 출력 */}
            <PriceWrapper>
              {renderPrice()}
            </PriceWrapper>

            <LikeButtonWrapper>
            <button onClick={handleLikeClick}>
              {/* 좋아요 여부에 따라 빈 하트(🤍)와 채워진 하트(💛)를 교체 */}
              <span style={{ color: isLiked ? 'orange' : 'gray' }}>
              {isLiked ? '💛' : '🤍'}
              </span>
            </button>
            <span>{`관심 ${likeCount}`}</span>
            </LikeButtonWrapper>



            <CommentSection>
              {/* 댓글 섹션 */}
            </CommentSection>

            <CommentInputWrapper>
              <CommentInput placeholder="댓글을 입력하세요" />
              <SubmitButton>댓글 작성</SubmitButton>
            </CommentInputWrapper>

            <BottomBox>
              <Footer />
            </BottomBox>
          </InnerDiv>
        </MyPageContainer>
      </BackgroundWrapper>
    </div>
  );
}

export default PostDetail;
