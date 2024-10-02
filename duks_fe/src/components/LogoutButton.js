import React from 'react';
import './LogoutButton.css';

const LogoutButton = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // 모달이 열려 있지 않으면 아무것도 렌더링하지 않음

    return (
        <div className="modal-overlay" onClick={onClose}> {/* 외부 클릭 시 닫기 */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* 내부 클릭 시 닫기 방지 */}
            <p className='logout-text'>로그아웃 하시겠어요?</p>
                <button className="cancel-button" onClick={onClose}>취소</button>
                <button className="logout-button" onClick={onClose}>로그아웃</button>
                {children} {/* 모달 내부에 전달된 내용을 렌더링 */}
            </div>
        </div>
    );
};

export default LogoutButton;

