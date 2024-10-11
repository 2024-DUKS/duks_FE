import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // useParams 추가
import { useNavigate } from 'react-router-dom'; // useNavigate 함수 불러오기
import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, CloseButton, BottomBox, BoardName, ProfileInfo, ScrollableContainer, PostTitle, PostDate, PostContent, PostImageWrapper, PostImage, CommentSection, CommentInputWrapper, CommentInput, SubmitButton, InfoContainer, ArrowButton, PriceWrapper, LikeButtonWrapper
} from '../styles/PostDetailStyle';    
import Footer from '../components/Footer';

const baseURL = 'http://localhost:5000';  // 백엔드 URL

const PostDetail = () => {
  const location = useLocation();
  const [post, setPost] = useState(null); // 게시물 정보 상태
  const navigate = useNavigate(); // useNavigate 함수 사용
  const [userInfo, setUserInfo] = useState({ nickname: '', department: '', profileImage: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스 상태 추가
  const [isLiked, setIsLiked] = useState(false); // 좋아요 여부를 상태로 관리
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수 상태 관리
  const [comments, setComments] = useState([]); // 댓글 상태
  const [newComment, setNewComment] = useState(''); // 새 댓글 상태
  const { id } = useParams(); // URL에서 ID를 가져옴


  useEffect(() => {
    console.log("전달된 게시물 데이터:", post);
  }, [post]);
  
  
  useEffect(() => {
    // 로컬스토리지에서 사용자 정보 가져오기
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      console.log("가져온 사용자 정보:", parsedUserInfo); // 추가된 로그
      setUserInfo(parsedUserInfo);
    }
  }, []);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`); // ID에 따라 게시물 정보 가져옴
        const data = await response.json();
        setPost(data); // 가져온 게시물 정보를 상태에 저장
      } catch (error) {
        console.error('게시글 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchPostDetails();
  }, [id]); // ID가 변경될 때마다 호출


  // 댓글 추가 함수
  const handleCommentSubmit = () => {
    if (!newComment) return; // 빈 댓글 제출 방지

    const commentObj = {
      id: comments.length + 1, // 새로운 댓글 ID 설정
      content: newComment, // 입력된 댓글 내용
      nickname: userInfo.nickname || "익명", // 사용자 이름 설정
    };

    setComments([...comments, commentObj]); // 상태 업데이트
    setNewComment(''); // 입력 필드 초기화
  };

  // 데이터가 없을 경우 기본값 설정
  if (!post) {
    return <div>게시물 데이터를 불러올 수 없습니다.</div>;
  }

  const imageUrls = post.image_url ? post.image_url.split(',') : [];

  const handleBack = () => {
    navigate(-1); // 뒤로 가기 기능
  };

  const handleProfileClick = () => {
    navigate('/card');  // 프로필 클릭 시 Card로 이동
  };

  // 이미지 이전 버튼 클릭 시
  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  // 이미지 다음 버튼 클릭 시
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  // description에서 줄 바꿈 처리
  const renderDescription = () => {
    if (!post.content) {
      return <div>상세 설명이 없습니다.</div>; // <p> 대신 <div>로 수정
    }

    return post.content.split('\n').map((line, index) => (
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
                <span>{post.nickname || '익명'}</span>
                <span>{post.department || '학과 정보 없음'}</span>
              </div>
            </ProfileInfo>

            {/* 스크롤 가능한 컨테이너 */}
            <ScrollableContainer>
              <PostTitle>{post.title || "제목이 없습니다"}</PostTitle> {/* 게시물 제목 */}

              {/* 카테고리와 날짜를 한 줄로 배치 */}
              <InfoContainer>
                <BoardName>{post.category || "카테고리 없음"}</BoardName>
                <PostDate>{new Date(post.created_at).toLocaleString() || "작성 날짜 없음"}</PostDate>
              </InfoContainer>

              {/* 게시물 내용에 줄 바꿈 반영 */}
              <PostContent>{renderDescription()}</PostContent>

              {/* 이미지가 1장 이상일 때만 화살표 버튼 표시 */}
              {imageUrls.length > 0 && (
                <PostImageWrapper>
                  {imageUrls.length > 1 && (
                    <ArrowButton onClick={previousImage}>&lt;</ArrowButton>
                  )}
                  <PostImage src={`${baseURL}${imageUrls[currentImageIndex]}`} alt={`post-${currentImageIndex}`} />
                  {imageUrls.length > 1 && (
                    <ArrowButton onClick={nextImage}>&gt;</ArrowButton>
                  )}
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

              {/* 댓글 섹션 */}
              {/* 댓글 입력 영역 */}
              <CommentInputWrapper>
                <CommentInput 
                  placeholder="댓글을 입력하세요"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)} // 입력 필드 상태 업데이트
                />
                <SubmitButton onClick={handleCommentSubmit}>댓글 작성</SubmitButton>
              </CommentInputWrapper>

              <CommentSection>
                {comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment.id}>
                      <strong>{comment.nickname}:</strong> {comment.content}
                    </div>
                  ))
                ) : (
                  <div>댓글이 없습니다.</div>
                )}
              </CommentSection>


            </ScrollableContainer>

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
