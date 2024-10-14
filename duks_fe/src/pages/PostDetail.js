import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // useParams 추가
import { useNavigate } from 'react-router-dom'; // useNavigate 함수 불러오기
import { 
  BackgroundWrapper, MyPageContainer, InnerDiv, TopBox, CloseButton, BottomBox, BoardName, ProfileInfo, ScrollableContainer, PostTitle, PostDate, PostContent, PostImageWrapper, PostImage, CommentSection, CommentInputWrapper, CommentInput, SubmitButton, InfoContainer, ArrowButton, PriceWrapper, LikeButtonWrapper, CommentButton, CommentButtonWrapper, CommentContainer
} from '../styles/PostDetailStyle';    
import Footer from '../components/Footer';
import axios from 'axios';

const baseURL = 'http://localhost:5000';  // 백엔드 URL

const PostDetail = () => {
  const location = useLocation();
  const [post, setPost] = useState(null); // 게시물 정보 상태
  const navigate = useNavigate(); // useNavigate 함수 사용
  const [userInfo, setUserInfo] = useState({ id: null, nickname: '', department: '', profileImage: '' }); // 사용자 정보 상태 추가
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스 상태 추가
  const [isLiked, setIsLiked] = useState(false); // 좋아요 여부를 상태로 관리
  const [likes, setLikeCount] = useState(0); // 좋아요 수 상태 관리
  const [comments, setComments] = useState([]); // 댓글 상태
  const [newComment, setNewComment] = useState(''); // 새 댓글 상태
  const [editingCommentId, setEditingCommentId] = useState(null); // 댓글 수정 상태 추가
  const [editedComment, setEditedComment] = useState(''); // 수정할 댓글 내용
  const { id } = useParams(); // URL에서 ID를 가져옴
  const userId = userInfo.id;  // 현재 로그인한 사용자의 ID

  const token = localStorage.getItem('authToken');  // 토큰 가져오기


  useEffect(() => {
    console.log("전달된 게시물 데이터:", post);
  }, [post]);
  
  
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
        console.log('로그인한 사용자 정보:', parsedUserInfo); // userInfo 확인
      } catch (error) {
        console.error("사용자 정보 파싱 중 오류 발생:", error);
      }
    } else {
      console.log("로컬 스토리지에 사용자 정보가 없습니다.");
    }
  }, []);
  
  
  

  // 게시물 세부정보 가져오기
  const fetchPostDetails = async () => {
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');  // 로그인 페이지로 이동
      return;
    }

    try {
      const response = await axios.get(`${baseURL}/api/posts/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.data) {
        setPost(response.data);  // 게시물 데이터 상태 업데이트
        console.log("받아온 게시물 데이터:", response.data);
      } else {
        console.log('게시물 데이터를 불러오지 못했습니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('인증 정보가 유효하지 않습니다. 다시 로그인하세요.');
        localStorage.removeItem('authToken');  // 잘못된 토큰 제거
        navigate('/login');  // 로그인 페이지로 이동
      } else {
        console.error('게시글 정보를 불러오는 중 오류 발생:', error);
      }
    }
  };
  

  // 페이지가 로드되었을 때 게시물 정보를 불러옴
  useEffect(() => {
    if (id) {
      console.log("게시물 ID:", id);  // ID 확인
      fetchPostDetails();  // 게시물 정보 가져오기
    }
  }, [id]);  // id가 변경될 때마다 호출

  useEffect(() => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;  // 토큰이 없으면 리턴하여 요청을 하지 않음
    }
  
    // 좋아요 상태와 수를 불러오는 비동기 함수
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/posts/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setIsLiked(response.data.isLiked || false); // 좋아요 여부 저장
        setLikeCount(response.data.likes || 0);     // 좋아요 수 저장
      } catch (error) {
        console.error('좋아요 정보를 불러오는 중 오류 발생:', error);
      }
    };
  
    fetchLikeStatus();  // 토큰이 있을 때만 호출
  }, [id, token]);  // token과 id가 변경될 때마다 호출
  



  // 댓글 추가 함수
  const handleCommentSubmit = () => {
    if (!newComment) return; // 빈 댓글 제출 방지
  
    const commentObj = {
      content: newComment,
      postId: id,
      nickname: userInfo.nickname || "익명", // 사용자 닉네임 추가
      userId: userInfo.id  // 댓글 작성자의 ID 추가
    };
  
    console.log("전송할 댓글:", commentObj);
  
    const token = localStorage.getItem('authToken'); // authToken으로 변경
    fetch('http://localhost:5000/api/comments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // 수정된 토큰 사용
      },
      body: JSON.stringify(commentObj),
    })
    .then(response => {
      if (response.ok) {
        // 댓글 목록 갱신을 위해 댓글 새로 가져오기
        fetchComments();
        setNewComment('');
      } else {
        console.error('댓글 추가 실패:', response.status, response.statusText); // 오류 로그 추가
        return response.json().then(err => console.error(err));
      }
    })
    .catch(error => console.error('댓글 추가 중 오류 발생:', error));
  };

  // 댓글을 불러오는 함수
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/comments/post/${id}/comments`);
      console.log("받아온 댓글 데이터:", response.data); // 콘솔에 댓글 데이터 출력
      setComments(response.data);
    } catch (error) {
      console.error('댓글을 불러오는 중 오류 발생:', error);
    }
  };
  

  useEffect(() => {
    fetchComments();
    console.log("받아온 댓글 데이터:", comments); // comments 로그 출력
  }, [id]);

  useEffect(() => {
    console.log("받아온 댓글 데이터:", comments);
  }, [comments]);
  

  

  // 댓글 수정 함수
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.content);
  };

  // 댓글 수정 제출 함수
  const handleEditCommentSubmit = async (commentId) => {
    const updatedComment = { content: editedComment };
    const token = localStorage.getItem('authToken');

    try {
      const response = await axios.put(`${baseURL}/api/comments/${commentId}`, updatedComment, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 200) {
        fetchComments(); 
        setEditingCommentId(null);
        setEditedComment('');
      }
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error);
    }
  };


// 댓글 삭제 함수
const handleDeleteComment = async (commentId) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.delete(`${baseURL}/api/comments/${commentId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.status === 200) {
      fetchComments(); 
    }
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error);
  }
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

  const handleLikeClick = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    try {
      // 이미 좋아요를 눌렀다면 좋아요 취소 요청
      if (isLiked) {
        const response = await axios.delete(`http://localhost:5000/api/posts/${id}/unlike`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          setIsLiked(false); // 좋아요 취소 후 상태 업데이트
          setLikeCount(prevCount => prevCount - 1);
        }
      } else {
        // 좋아요가 되어 있지 않다면 좋아요 요청
        const response = await axios.post(`http://localhost:5000/api/posts/${id}/like`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          setIsLiked(true); // 좋아요 후 상태 업데이트
          setLikeCount(prevCount => prevCount + 1);
        }
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
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
                <span>{`관심 ${likes}`}</span>
              </LikeButtonWrapper>

              {/* 댓글 섹션 */}
              {/* 댓글 작성 영역 */}
              <CommentInputWrapper>
                <CommentInput 
                  placeholder="댓글을 입력하세요"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)} 
                />
                <SubmitButton onClick={handleCommentSubmit}>댓글 작성</SubmitButton>
              </CommentInputWrapper>

              {/* 댓글 목록 */}
<CommentSection>
  {comments.length > 0 ? (
    comments.map(comment => (
      <CommentContainer key={comment.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: '230px', flexGrow: 1 }}>
          <div onClick={handleProfileClick} style={{ cursor: 'pointer', marginRight: '10px' }}>
            <strong>{comment.nickname}:</strong>
          </div>
          {/* 수정 중일 때는 input 필드와 '수정 완료' 버튼, 수정 중이 아닐 때는 댓글 내용 표시 */}
          {editingCommentId === comment.id ? (
            <>
              <input
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                style={{ marginRight: '60px' }} // 수정 중일 때도 간격 유지
              />
              <CommentButton onClick={() => handleEditCommentSubmit(comment.id)}>수정 완료</CommentButton>
            </>
          ) : (
            <p>{comment.content}</p>
          )}
        </div>

        {/* comment.user_id와 userInfo.id가 일치할 때만 버튼 표시 */}
        {comment.user_id === userInfo.id && (
          <CommentButtonWrapper>
            {/* 수정 중일 때는 수정/삭제 버튼 숨기고 '수정 완료' 버튼만 표시 */}
            {editingCommentId === comment.id ? null : (
              <>
                <CommentButton onClick={() => handleEditComment(comment)}>수정</CommentButton>
                <CommentButton onClick={() => handleDeleteComment(comment.id)}>삭제</CommentButton>
              </>
            )}
          </CommentButtonWrapper>
        )}
      </CommentContainer>
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
