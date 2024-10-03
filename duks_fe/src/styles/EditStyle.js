import styled from "styled-components";

// 화면 바깥 배경색을 위한 글로벌 스타일
export const BackgroundWrapper = styled.div`
  background-color:black; /* 화면 바깥 배경색 설정 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
`;

//CSS 모음
// 마이 페이지 컨테이너
export const MyPageContainer = styled.div`
  width: 430px;
  height: 932px;
  background-color: black;

    /* Flexbox 설정 */
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center;     /* 수평 중앙 정렬 */

  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

// 내부 div
export const InnerDiv = styled.div`
  width: 430px;
  height: 932px;
  background-color: #ffffff;

  /* Flexbox 설정 */
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  align-items: center;     /* 수평 중앙 정렬 */
  position: relative;

`;


export const TopBox = styled.div`
  background-color: white;
  position: absolute;
  height: 62px;
  width: 430px;
  left: 0;
  top: 0;
`;

export const BottomBox = styled.div`
  background-color: #FFB204;
  position: absolute;
  height: 62px;
  width: 430px;
  bottom: 0px;
`;

export const CloseButton = styled.button`
  background-color: transparent; /* 배경을 투명하게 설정 */
  color: black; /* X 버튼을 항상 검은색으로 설정 */
  position: absolute;
  left: 20px;
  top: 18px;
  background: none;
  border: none;
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
`;

export const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  font-weight: bold;
  color: black;
`;

export const TradeOptionWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: flex-start; /* 세로 방향으로도 왼쪽 정렬 */
  width: 100%; /* 전체 너비 사용 */
  margin-left: 40px; /* 왼쪽 여백 */
`;


export const TradeOptionButton = styled.button`
  background-color: ${props => (props.selected ? '#FFB204' : 'light gray')};
  border: 1px solid ${props => (props.selected ? '#FFB204' : '#cccccc')}; /* 선택된 경우와 선택되지 않은 경우의 테두리 색 설정 */
  border-radius: 20px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  color: ${props => (props.selected ? 'white' : 'black')};
  font-size: 13px;
`;

export const SectionTitle1 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 80px;
  color: black;
  align-self: flex-start;
`;

export const SectionTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start; /* 왼쪽 정렬 */
    width: 100%; /* 전체 너비 사용 */
    margin-left: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 20px;
  color: black;
  align-self: flex-start;
`;

export const PriceHint = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 10px;
  margin-top: 7px;
`;

export const DropdownWrapper = styled.div`
  width: 93%;
  margin-right: 25px;
  margin-left:10px;
`;

export const Dropdown = styled.select`
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
`;

export const FileInputWrapper = styled.div`
  width: 100%;
  margin-left: 20px;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

export const FileInputLabel = styled.label`
  background-color: #E0E0E0;
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: black;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileCount = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: #FFB204;
`;

export const DeleteButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 10px; /* 오른쪽에서 5px 만큼 떨어지도록 설정 */
  background-color: gray;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const ImagePreviewWrapper = styled.div`
  display: flex;
  overflow-x: auto; /* 가로 스크롤 */
  width: 90%;
  margin-left: 20px;
  margin-top: 10px;
`;

export const ImagePreview = styled.img`
  width: 80px; /* 작은 크기로 미리보기 */
  height: 80px;
  object-fit: cover; /* 이미지 비율을 유지하며 채우기 */
  margin-right: 10px; /* 이미지 간의 간격 */
  border-radius: 10px; /* 둥근 모서리 */
`;

export const InputWrapper = styled.div`
  width: 90%;
  margin: 5px 0;
`;

export const TextInput = styled.input`
width: 90%;
padding: 10px;
border: 1px solid black;
border-radius: 5px;
font-size: 14px;
`;

export const PriceInput = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 14px;
  &.talent-donation {
    color: black; /* 입력된 텍스트가 검정색일 경우 */
  }

  /* 플레이스홀더 색상 설정 */
  &::placeholder {
    color: gray; /* 기본 회색 */
  }

  /* 재능기부인 경우 플레이스홀더 색상을 검정으로 변경 */
  &.talent-donation::placeholder {
    color: black;
  }
`;

export const PriceMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;