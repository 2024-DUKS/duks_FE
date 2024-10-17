import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기
import Footer from '../components/Footer';
import backButton from '../img/backButton.png';

const BackgroundWrapper = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
`;

const MyPageContainer = styled.div`
  max-width: 430px;
  height: 932px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const TopBox = styled.div`
  background-color: #FFB204;
  height: 62px;
  width: 430px;
  left: 0;
  top: 0;
  display: flex;
  align-items: center; /* 중앙 정렬 */
`;

export const BackButton = styled.button`
  background: none; 
  border: none;
  cursor: pointer;
  padding: 0;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 5px;
  margin-bottom: 17px;
  width: 18px; 
  height: 18px;
  img {
    width: 100%; 
    height: auto;
  }
`;

const BackButtonImage = styled.img`
  width: 24px; /* 원하는 이미지 너비 설정 */
  height: auto; /* 비율 유지 */
`;

const Title = styled.h1`
  flex: 1; /* 제목을 가운데에 정렬 */
  text-align: center;
  font-size: 18px;
  color: black;
  margin-right:40px;
`;

const BottomBox = styled.div`
  background-color: #FFB204;
  height: 62px;
  width: 100%;
`;

const OverlapWrapper = styled.div`
  height: calc(100vh - 124px);
  overflow-y: auto;
  width: 100%;
  position: relative;
`;

const Overlap = styled.div`
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0px 4px 4px #00000040;
  padding: 10px;
  margin: 10px 0;
`;

const StyledTextArea = styled.textarea`
  width: 80%;
  height: 100px;
  margin: 5px 0;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

const CustomFileButton = styled.label`
  cursor: pointer;
  background-color: #92b455;
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
`;

const StyledH2 = styled.h2`
  font-size: 15px;
  background-color: #92b455;
  color: white;
  padding: 8px;
  text-align: center;
  border-radius: 7px;
`;

const Button = styled.button`
  background-color: #33333382;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const Message = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
`;

const SuccessMessage = styled(Message)`
  background-color: #d4edda;
  color: #155724;
`;

const ErrorMessage = styled(Message)`
  background-color: #f8d7da;
  color: #721c24;
`;

export default function NextPage() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [card, setCard] = useState(null);
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [authToken, setAuthToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/portfolios/charactor2', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        setCard({
          content: response.data.charactor2,
          photos: []
        });
      }
      const imagesResponse = await axios.get('http://localhost:5000/api/portfolios/portfolioImages2', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (imagesResponse.data && imagesResponse.data.length > 0) {
        setCard(prevCard => ({
          ...prevCard,
          photos: imagesResponse.data.map(img => `http://localhost:5000/${img.imagePath}`)
        }));
      }
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      setMessage({ type: 'error', content: '데이터를 불러오는데 실패했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 10) {
      setMessage({ type: 'error', content: "최대 10장의 사진만 업로드할 수 있습니다." });
      return;
    }
    setPhotos(files);
    setCurrentPhotoIndex(0);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    if (!content) {
      setMessage({ type: 'error', content: "내용을 입력해 주세요." });
      return;
    }
    if (photos.length === 0) {
      setMessage({ type: 'error', content: "최소 1장의 사진을 업로드해야 합니다." });
      return;
    }

    try {
      setIsLoading(true);
      // Charactor2 업데이트
      await axios.post('http://localhost:5000/api/portfolios/charactor2', 
        { charactor2: content },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      // 이미지 업로드
      const formData = new FormData();
      photos.forEach((photo) => {
        formData.append('images', photo);
      });

      await axios.post('http://localhost:5000/api/portfolios/portfolioImages2', 
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );

      setMessage({ type: 'success', content: '데이터가 성공적으로 저장되었습니다.' });
      // 데이터 다시 불러오기
      fetchUserData(authToken);

      setContent('');
      setPhotos([]);
      setCurrentPhotoIndex(0);
    } catch (error) {
      console.error('데이터를 저장하는 중 오류가 발생했습니다:', error);
      setMessage({ type: 'error', content: '데이터 저장에 실패했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete('http://localhost:5000/api/portfolios/charactor2', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      await axios.delete('http://localhost:5000/api/portfolios/portfolioImages2', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setCard(null);
      setMessage({ type: 'success', content: '데이터가 성공적으로 삭제되었습니다.' });
    } catch (error) {
      console.error('데이터를 삭제하는 중 오류가 발생했습니다:', error);
      setMessage({ type: 'error', content: '데이터 삭제에 실패했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex < (card ? card.photos.length : photos.length) - 1 ? prevIndex + 1 : 0));
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : (card ? card.photos.length : photos.length) - 1));
  };

  return (
    <BackgroundWrapper>
      <MyPageContainer>
      <TopBox>
      <BackButton onClick={() => navigate(-1)} title="뒤로가기">
            <img src={backButton} alt="BackButton" />
          </BackButton>
          <Title>포트폴리오</Title>
        </TopBox>
        <OverlapWrapper>
          <Overlap>
            <div style={{ textAlign: 'center', padding: '20px', fontSize: '15px' }}>
              간단한 사진과 텍스트로<br />
              나의 재능을 뽐내보세요!<br />
              사진은 최대 10장까지 업로드됩니다.<br />
              Skill 칸에 자신의 재능에 대한 설명을 적으면<br />
              다른 사람들이 나와 거래할 때 도움이 됩니다.<br />
            </div>
          </Overlap>

          {card ? (
            <Overlap style={{ position: 'relative' }}>
              <DeleteButton onClick={handleDelete} disabled={isLoading}>
                <Trash2 size={24} />
              </DeleteButton>
              <StyledH2>PHOTO</StyledH2>
              <div style={{ position: 'relative', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                {card.photos.length > 0 ? (
                  <img src={card.photos[currentPhotoIndex]} alt="카드 사진" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                ) : (
                  <div style={{ border: '1px dashed #ccc', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    사진이 없습니다
                  </div>
                )}
                {card.photos.length > 1 && (
                  <>
                    <Button onClick={handlePreviousPhoto} style={{ position: 'absolute', left: 0 }}>
                      <ChevronLeft size={24} />
                    </Button>
                    <Button onClick={handleNextPhoto} style={{ position: 'absolute', right: 0 }}>
                      <ChevronRight size={24} />
                    </Button>
                  </>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {card.photos.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: index === currentPhotoIndex ? '#92b455' : '#ccc',
                      margin: '0 5px',
                    }}
                  />
                ))}
              </div>
              <StyledH2>SKILL</StyledH2>
              <p style={{ backgroundColor: 'white', padding: '10px', minHeight: '100px' }}>{card.content}</p>
            </Overlap>
          ) : (
            <Overlap>
              <StyledH2>UPLOAD PHOTO</StyledH2>
              <CustomFileButton htmlFor="file-upload">
                사진 선택하기
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </CustomFileButton>

              <div style={{ position: 'relative', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                {photos.length > 0 ? (
                  <img src={URL.createObjectURL(photos[currentPhotoIndex])} alt="업로드된 사진" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                ) : (
                  <div style={{ border: '1px dashed #ccc', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    사진이 없습니다
                  </div>
                )}
                {photos.length > 1 && (
                  <>
                    <Button onClick={handlePreviousPhoto} style={{ position: 'absolute', left: 0 }}>
                      <ChevronLeft size={24} />
                    </Button>
                    <Button onClick={handleNextPhoto} style={{ position: 'absolute', right: 0 }}>
                      <ChevronRight size={24} />
                    </Button>
                  </>
                )}
              </div>
              {photos.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  {photos.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: index === currentPhotoIndex ? '#92b455' : '#ccc',
                        margin: '0 5px',
                      }}
                    />
                  ))}
                </div>
              )}

              <StyledH2>SKILL</StyledH2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <StyledTextArea
                  value={content}
                  onChange={handleContentChange}
                  placeholder="내용을 입력하세요."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? '처리 중...' : '등록'}
                </Button>
              </div>
            </Overlap>
          )}

          
        </OverlapWrapper>
        <Footer />
        <BottomBox />
      </MyPageContainer>
    </BackgroundWrapper>
  );
}
