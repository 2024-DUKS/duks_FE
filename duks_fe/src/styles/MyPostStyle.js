import styled from 'styled-components';

export const BackgroundWrapper = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyPageContainer = styled.div`
  width: 430px;
  height: 932px;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
`;

export const InnerDiv = styled.div`
  width: 430px;
  height: 932px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const TopBox = styled.div`
  background-color: #FFB204;
  position: relative; 
  height: 62px;
  width: 100%; 
  left: 0;
  top: 0;
`;

export const BackButton = styled.button`
  background: none; 
  border: none;
  cursor: pointer;
  padding: 0;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 5px;
  width: 18px; 
  height: 18px;
  img {
    width: 100%; 
    height: auto;
  }
`;

export const PageTitle = styled.div`
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-right: 140px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0;
`;

export const TypeButton = styled.button`
  background-color: ${props => props.selected ? '#FFB204' : '#ffffff'};
  color: ${props => props.selected ? '#ffffff' : '#FFB204'};
  border: 2px solid #ddd;
  border-radius: 20px;
  padding: 5px 25px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 10px;
  &:hover {
    background-color: #FFB204;
    color: #ffffff;
  }
`;

export const PostListBox = styled.div`
  width: 95%;
  height: 79%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding-right: 10px; 
`;

export const PostItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1; 
  }
`;

export const PostImage = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
  flex-shrink: 0; 
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  padding: 10px; 
  width: 100%;
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
`;

export const PostPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

export const PostTitle = styled.div`
  font-size: 14px;
  color: #000000;
  margin-top: 4px;  
`;

export const PostInfo2 = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  margin-top: 10px;
`;

export const PostDetails = styled.p`
  font-size: 13px;
  color: #000000;
  margin-top: 6px;
  align-self: flex-start;
`;

export const HeartIcon = styled.span`
  color: #FFB204;
  font-size: 13px;
  margin-right: 5px;
`;

export const HeartCount2 = styled.span`
  font-size: 13px;
  color: #FFB204;
`;

export const HeartContainer = styled.div`
  display: flex;
  align-items: center;
`;

// 하단 박스
export const BottomBox = styled.div`
  background-color: #FFB204;
  position: absolute;
  height: 62px;
  width: 100%;
  bottom: 0px;
`;

export const NoResultsMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #777;
  margin-top: 20px;
`;
