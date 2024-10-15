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
  const [menuVisible, setMenuVisible] = useState(false); // 메뉴 표시 여부

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
  
  // 게시물 및 사용자 정보 불러오기 함수 선언
  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(response.data);
    } catch (error) {
      console.error('게시물 정보를 불러오는 중 오류 발생:', error);
    }
  };

  // 게시물 및 사용자 정보 불러오기
  useEffect(() => {
    fetchPostDetails(); // 게시물 정보 가져오기
  }, [id, token]);  // id와 token이 변경될 때마다 호출
  
  // 좋아요 상태와 수를 불러오는 비동기 함수
  useEffect(() => {
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
        fetchComments(); // 댓글 목록 갱신
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
  }, [id]);
  
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


  // 게시물 삭제 함수
  const handleDeletePost = async () => {
    try {
      await axios.delete(`${baseURL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('게시물이 삭제되었습니다.');
      navigate('/main'); // 메인 페이지로 이동
    } catch (error) {
      console.error('게시물 삭제 중 오류 발생:', error);
    }
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
      return <div>상세 설명이 없습니다.</div>;
    }
    return post.content.split('\n').map((line, index) => (
      <span key={index}>{line}<br /></span>
    ));
  };

    // 가격 표시 함수
  const renderPrice = () => {
    if (parseInt(post.price) === 0) {
      return '재능 기부';
    } else {
      return `가격: ${post.price}원`;
    }
  };



  const handleLikeClick = async () => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    try {
      if (isLiked) {
        const response = await axios.delete(`http://localhost:5000/api/posts/${id}/unlike`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.status === 200) {
          setIsLiked(false); 
          setLikeCount(prevCount => prevCount - 1);
        }
      } else {
        const response = await axios.post(`http://localhost:5000/api/posts/${id}/like`, {}, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.status === 200) {
          setIsLiked(true); 
          setLikeCount(prevCount => prevCount + 1);
        }
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };
  
  if (!post) {
    return <div>게시물 데이터를 불러올 수 없습니다.</div>;
  }

  const imageUrls = post.image_url ? post.image_url.split(',') : [];

  return (
    <div className="postdetail-page-wrapper">
      <BackgroundWrapper>
        <MyPageContainer>
          <InnerDiv>
          <TopBox>
              <CloseButton onClick={() => navigate(-1)}>X</CloseButton>
              {/* 게시물 작성자인 경우에만 세로로 된 점 3개 메뉴 표시 */}
              {post.user_id === userInfo.id && (
                <div style={{ position: 'absolute', top: '15px', right: '30px' }}>
                  {/* 세로로 된 점 3개 버튼 */}
                  <button
                    onClick={() => setMenuVisible(!menuVisible)}
                    style={{
                      fontSize: '24px',
                      background: 'none',
                      border: 'none',
                      color: 'black',
                      cursor: 'pointer'
                    }}
                  >
                    ⋮
                  </button>

                 {/* 메뉴 드롭다운 */}
    {menuVisible && (
      <div
        style={{
          position: 'absolute',
          top: '30px',
          right: '0',
          background: '#fff7f0',  // 밝은 배경색 추가
          border: '1px solid #ffcc99',  // 테두리 색상 변경
          borderRadius: '8px',  // 모서리를 둥글게
          padding: '10px',
          width: '150px',  // 버튼을 가로로 길게 만듦
          textAlign: 'center',
        }}
      >
        {/* 게시물 삭제 버튼 */}
        <button
          onClick={handleDeletePost}
          style={{
            backgroundColor: '#D2B48C', 
            color: 'white',
            border: 'none',
            borderRadius: '20px',  // 버튼을 둥글게
            padding: '10px 20px',
            fontSize: '14px',
            cursor: 'pointer',
            width: '100%',  // 버튼을 가로로 길게 설정
          }}
        >
          게시물 삭제하기
        </button>
      </div>
    )}
  </div>
)}
            </TopBox>


            {/* 프로필 섹션 */}
            <ProfileInfo onClick={handleProfileClick}> {/* 클릭 시 Card로 이동 */}
              <img src={userInfo.profileImage || '/default-profile.png'} alt="Profile" />
              <div>
                <span>{post.nickname || '익명'}</span>
                <span>{post.department || '학과 정보 없음'}</span>
              </div>
            </ProfileInfo>

            <ScrollableContainer>
              <PostTitle>{post.title || "제목이 없습니다"}</PostTitle>

              <InfoContainer>
                <BoardName>{post.category || "카테고리 없음"}</BoardName>
                <PostDate>{new Date(post.created_at).toLocaleString() || "작성 날짜 없음"}</PostDate>
              </InfoContainer>

              <PostContent>{renderDescription()}</PostContent>

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

              <PriceWrapper>{renderPrice()}</PriceWrapper>

              <LikeButtonWrapper>
                <button onClick={handleLikeClick}>
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
