import styled from "styled-components";

// 선택자 구체성을 높이기 위해 부모 클래스를 추가
export const BackgroundWrapper = styled.div`
  .edit-page-wrapper & {
    background-color:black; /* 화면 바깥 배경색 설정 */
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
  }
`;

export const MyPageContainer = styled.div`
  .edit-page-wrapper & {
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
  }
`;

export const InnerDiv = styled.div`
  .edit-page-wrapper & {
    width: 430px;
    height: 932px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
`;

export const TopBox = styled.div`
  .edit-page-wrapper & {
    background-color: white;
    position: absolute;
    height: 62px;
    width: 430px;
    left: 0;
    top: 0;
  }
`;

export const BottomBox = styled.div`
  .edit-page-wrapper & {
    background-color: #FFB204;
    position: absolute;
    height: 62px;
    width: 430px;
    bottom: 0px;
  }
`;

export const CloseButton = styled.button`
  .edit-page-wrapper & {
    background-color: transparent; /* 배경을 투명하게 설정 */
    color: black; /* X 버튼을 항상 검은색으로 설정 */
    position: absolute;
    left: 40px;
    top: 18px;
    background: none;
    border: none;
    font-size: 21px;
    font-weight: bold;
    cursor: pointer;
    padding: 0; /* 패딩을 없애서 버튼 크기 줄임 */
    width: auto; /* 버튼 크기를 글자에 맞게 설정 */
    height: auto; /* 높이도 글자 크기에 맞게 설정 */
    line-height: 1; /* 라인 높이를 줄여서 버튼이 글자에 맞게 조정됨 */
  }
`;

export const Title = styled.h1`
  .edit-page-wrapper & {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 22px;
    font-weight: bold;
    color: black;
  }
`;

export const TradeOptionWrapper = styled.div`
  .edit-page-wrapper & {
    display: flex;
    justify-content: flex-start; /* 왼쪽 정렬 */
    align-items: flex-start; /* 세로 방향으로도 왼쪽 정렬 */
    width: 100%; /* 전체 너비 사용 */
    margin-left: 40px; /* 왼쪽 여백 */
    margin-bottom: 15px;
  }
`;

export const TradeOptionButton = styled.button`
  .edit-page-wrapper & {
    background-color: ${props => (props.selected ? '#FFB204' : '#EAEAEA')};
    border: 1px solid ${props => (props.selected ? '#FFB204' : '#EAEAEA')};
    border-radius: 20px;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    color: ${props => (props.selected ? 'white' : 'black')};
    font-size: 13px;
  }
`;

export const SectionTitle1 = styled.h2`
  .edit-page-wrapper & {
    font-size: 18px;
    font-weight: bold;
    margin-left: 20px;
    margin-top: 80px;
    color: black;
    align-self: flex-start;
  }
`;

export const SectionTitleWrapper = styled.div`
  .edit-page-wrapper & {
    display: flex;
    align-items: center;
    justify-content: flex-start; /* 왼쪽 정렬 */
    width: 100%; /* 전체 너비 사용 */
`;

export const SectionTitle = styled.h2`
  .edit-page-wrapper & {
    font-size: 18px;
    font-weight: bold;
    margin-left: 20px;
    margin-top: 10px;
    color: black;
    align-self: flex-start;
  }
`;

export const PriceHint = styled.span`
  .edit-page-wrapper & {
    color: red;
    font-size: 12px;
    margin-left: 10px;
    margin-top: 13px;
  }
`;

export const DropdownWrapper = styled.div`
  .edit-page-wrapper & {
    width: 93%;
    margin-right: 25px;
    margin-left: 40px;
    margin-bottom: 15px;
  }
`;

export const Dropdown = styled.select`
  .edit-page-wrapper & {
    width: 90%;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
  }
`;

export const FileInputWrapper = styled.div`
.edit-page-wrapper & {
  display: flex;
  align-items: flex-start; /* 수직으로 상단에 고정 */
  justify-content: flex-start; /* 파일 첨부와 1/10을 왼쪽 정렬 */
  margin-left:20px;
  margin-right: 10px; /* 미리보기 이미지와의 간격 설정 */
}
`;

export const FileInputLabel = styled.label`
  .edit-page-wrapper & {
    background-color: #E0E0E0;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    color: black;
    white-space: nowrap; /* 텍스트가 한 줄에 나오도록 설정 */
  }
`;


export const FileInput = styled.input`
  .edit-page-wrapper & {
    display: none;
  }
`;

export const FileCount = styled.span`
  .edit-page-wrapper & {
    margin-left: 10px;
    margin-top: 17px;
    font-size: 12px;
    color: black;
  }
`;

export const DeleteButtonWrapper = styled.div`
  .edit-page-wrapper & {
    position: relative;
    display: inline-block;
  }
`;

export const DeleteButton = styled.button`
  .edit-page-wrapper & {
    position: absolute;
    top: 0;
    right: 10px;
    background-color: gray;
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 12px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const ImagePreviewWrapper = styled.div`
  .edit-page-wrapper & {
    display: flex;
    flex-wrap: nowrap; /* 이미지가 한 줄에 나열되도록 설정 */
    overflow-x: auto; /* 가로 스크롤 */
    max-width: 45%; /* 최대 너비를 설정하여 화면 벗어나지 않도록 */
    margin-left: 15px; /* 파일 첨부와 미리보기 사이 간격 */
    margin-top: 0; /* 같은 줄에 배치 */
  }
`;

export const ImagePreview = styled.img`
  .edit-page-wrapper & {
    width: 65px; /* 작은 크기로 미리보기 */
    height: 65px;
    object-fit: cover; /* 이미지 비율을 유지하며 채우기 */
    margin-right: 10px; /* 이미지 간의 간격 */
    border-radius: 10px; /* 둥근 모서리 */
  }
`;

export const InputWrapper = styled.div`
  .edit-page-wrapper & {
    width: 90%;
    margin: 5px 0;
  }
`;

export const TextInput = styled.input`
  .edit-page-wrapper & {
    width: 90%;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 14px;
  }
`;

export const PriceInput = styled.input`
  .edit-page-wrapper & {
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
  }
`;

export const PriceMessage = styled.span`
  .edit-page-wrapper & {
    color: red;
    font-size: 12px;
    margin-top: 12px;
    display: block;
  }
`;

export const TextArea = styled.textarea`
  .edit-page-wrapper & {
    width: 90%;
    height: 130px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 14px;
    resize: none; /* 크기 조절 막기 */
    margin-top: 10px;
  }
`;

export const SubmitButton = styled.button`
  .edit-page-wrapper & {
    background-color: #FFB204;
    border: none;
    color: white;
    font-size: 18px;
    font-weight: bold;
    padding: 8px 20px;
    border-radius: 20px;
    cursor: pointer;
    width: 40%;
    margin-top: 10px;
    position: relative;
  }
`;
