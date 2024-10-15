import React from 'react';
import './LogoutButton.css';

const LogoutButton = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null; // 모달이 열려 있지 않으면 아무것도 렌더링하지 않음

    return (
        <div className="modal-overlay" onClick={onClose}> {/* 외부 클릭 시 닫기 */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* 내부 클릭 시 닫기 방지 */}
                <p className='logout-text'>로그아웃 하시겠어요?</p>
                <button className="cancel-button" onClick={onClose}>취소</button>
                {/* 로그아웃 버튼에서 onLogout 호출 */}
                <button className="logout-button" onClick={onLogout}>로그아웃</button>
            </div>
        </div>
    );
};

export default LogoutButton;
