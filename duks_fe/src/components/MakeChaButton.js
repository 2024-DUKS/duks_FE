import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import styles from './MakeChaButton.module.css'; // CSS 모듈 임포트

Modal.setAppElement('#root');
const MakeChaButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [charactors, setCharactors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const [successMessage, setSuccessMessage] = useState('');
    const [isCharactorAdded, setIsCharactorAdded] = useState(false); // 성격이 추가되었는지 여부를 나타내는 상태

    const token = localStorage.getItem('authToken');

    const fetchCharactors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/portfolios/charactor', {
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}`
                }
            });
            
            // 데이터를 배열로 설정
            const charactorData = Array.isArray(response.data) ? response.data : [response.data];
            setCharactors(charactorData);
            setIsCharactorAdded(charactorData.length > 0); // 성격이 하나라도 있으면 true로 설정
        } catch (error) {
            console.error('Charactor를 불러오는 데 실패했습니다:', error);
            setErrorMessage('Charactor를 불러오는 데 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCharactors();
    }, []);
    
    useEffect(() => {
        console.log("Updated charactors:", charactors); // charactors 상태가 변경될 때마다 로그를 출력해 확인합니다.
        setIsCharactorAdded(charactors.length > 0); // charactors 상태 업데이트 시 성격이 추가되었는지 여부를 설정
    }, [charactors]);
    
    const openModal = () => {
        setModalIsOpen(true);
        setErrorMessage(''); // Modal 열 때 에러 메시지 초기화
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setInputText('');
        setIsEditing(false);
        setEditingIndex(null);
        setErrorMessage(''); // Modal 닫을 때 에러 메시지 초기화
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", inputText); // 입력값 확인
        try {
            const response = await axios.post('http://localhost:5000/api/portfolios/charactor', 
                { charactor: inputText }, {
                    headers: { 
                        'Content-Type': 'application/json', 
                        Authorization: `Bearer ${token}`
                    },
                });
            
            console.log(response.data.message); // 성공 메시지 출력
            const addedCharactor = { id: response.data.id, charactor: inputText }; // ID를 응답에서 추출할 수 없으면 여기에 직접 추가
            setCharactors((prev) => [...prev, addedCharactor]); // 상태 업데이트
            
            // 성격이 추가되었으므로 버튼 숨기기
            setIsCharactorAdded(true);
    
            // 모달 닫기 및 초기화
            closeModal(); 
        } catch (error) {
            console.error('Charactor 추가 실패:', error);
            setErrorMessage('Charactor 추가에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleDoubleClick = (index) => {
        setEditingIndex(index);
        setInputText(charactors[index].charactor);
        setIsEditing(true);
        openModal();
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedCharactor = { charactor: inputText };
            
            // 수정 요청
            const response = await axios.put(`http://localhost:5000/api/portfolios/charactor/${charactors[editingIndex].id}`, updatedCharactor, {
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}` 
                },
            });
    
            const { id, userId, charactor } = response.data; // 응답에서 id, userId, charactor 추출
    
            setCharactors((prev) => {
                const newCharactors = [...prev];
                newCharactors[editingIndex] = { id, userId, charactor }; // 수정된 캐릭터로 업데이트
                return newCharactors;
            });
    
            closeModal(); // 모달 닫기
        } catch (error) {
            console.error('Charactor 수정 실패:', error);
            setErrorMessage('Charactor 수정에 실패했습니다. 다시 시도해주세요.');
        }
    };
    
    const handleDelete = async (index) => {
        const charactorId = charactors[index].id; // ID 로그 출력
        console.log("삭제할 charactor ID:", charactorId);
        try {
            const response = await axios.delete(`http://localhost:5000/api/portfolios/charactor`, {
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}` 
                },
            });
            
            console.log(response.data.message); // 삭제 성공 메시지 출력
    
            setCharactors((prev) => prev.filter((_, i) => i !== index));
            // 삭제 후 charactors가 비어있으면 버튼 다시 보이게 설정
            if (charactors.length <= 1) {
                setIsCharactorAdded(false);
            }
        } catch (error) {
            console.error('Charactor 삭제 실패:', error.response?.data || error.message);
            setErrorMessage('Charactor 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };
    
    return (
        <div className={styles.MakeChaButton_div}>
            <box>User Character  </box>
            {!isCharactorAdded && ( // 성격이 추가되지 않았을 때만 버튼을 보여줌
                <button className={styles.MakeChaButton_plusButton} onClick={openModal}>+</button>
            )}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.MakeChaButton_AbilityModal}>
                <h2 className={styles.MakeChaButton_h2}>{isEditing ? 'Charactor를 수정해주세요' : 'Charactor를 알려주세요!'}</h2>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <form onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
                    <div>
                        <label className={styles.MakeChaButton_label}>
                            <input
                                type="text"
                                value={inputText}
                                onChange={handleInputChange}
                                className={styles.MakeChaButton_inputText}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit" className={styles.MakeChaButton_button} disabled={!inputText}>
                        {isEditing ? '수정' : '등록'}
                    </button>
                    <button type="button" onClick={closeModal} className={styles.MakeChaButton_button}>닫기</button>
                </form>
            </Modal>
            {successMessage && <p className={styles.success}>{successMessage}</p>}
            <div>
                {isLoading ? (
                    <p>로딩 중...</p>
                ) : charactors && charactors.length > 0 ? (
                    <ul>
                        {charactors.map(({ id, charactor }, index) => (
                            <li key={id}>
                                <button onClick={() => handleDelete(index)} className={styles.deleteButton}>-</button>
                                {charactor}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>등록된 Charactor가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MakeChaButton;
