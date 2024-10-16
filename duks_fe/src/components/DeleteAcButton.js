import React from 'react';
import './DeleteAcButton.css';

const DeleteAcButton = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null; // 모달이 열려 있지 않으면 아무것도 렌더링하지 않음

    return (
        <div className="modal-overlay" onClick={onClose}> {/* 외부 클릭 시 닫기 */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* 내부 클릭 시 닫기 방지 */}
                <p className='deleteAccount-text'>탈퇴 하시겠어요?</p>
                <button className="cancel-button" onClick={onClose}>취소</button>
                {/* 탈퇴 버튼 클릭 시 onLogout 함수 호출 (실제 로그아웃 처리) */}
                <button className="deleteAccount-button" onClick={onLogout}>탈퇴</button>
            </div>
        </div>
    );
};

export default DeleteAcButton;
