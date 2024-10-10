import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import styles from './MakeChaButton.module.css'; // CSS 모듈 임포트

const MakeChaButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [charactors, setCharactors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const token = localStorage.getItem('authToken');

    const fetchCharactors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/portfolios/charactor', {
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}` // 백틱으로 수정
                }
            });
            console.log(response.data); // Log the response to check its structure
            setCharactors(response.data);
        } catch (error) {
            console.error('Charactor를 불러오는 데 실패했습니다:', error);
            setErrorMessage('Charactor를 불러오는 데 실패했습니다. 다시 시도해주세요.');
        }
    };
    
    useEffect(() => {
        fetchCharactors(); // 컴포넌트 마운트 시 Charactor 불러오기
    }, []);

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
        try {
            const response = await axios.post('http://localhost:5000/api/portfolios/charactor', 
                { charactor: inputText }, {
                    headers: { 
                        'Content-Type': 'application/json', 
                        Authorization: `Bearer ${token}` // 백틱으로 수정
                    },
                });
            setCharactors((prev) => [...prev, response.data]);
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
            await axios.put(`http://localhost:5000/api/portfolios/charactor/${charactors[editingIndex].id}`, updatedCharactor, {
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}` // 백틱으로 수정
                },
            });
            setCharactors((prev) => {
                const newCharactors = [...prev];
                newCharactors[editingIndex] = { ...newCharactors[editingIndex], charactor: inputText };
                return newCharactors;
            });
            closeModal();
        } catch (error) {
            console.error('Charactor 수정 실패:', error);
            setErrorMessage('Charactor 수정에 실패했습니다. 다시 시도해주세요.');
        }
    };
    
    const handleDelete = async (index) => {
        try {
            await axios.delete(`http://localhost:5000/api/portfolios/charactor/${charactors[index].id}`, {
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}` // 백틱으로 수정
                },
            });
            setCharactors((prev) => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Charactor 삭제 실패:', error);
            setErrorMessage('Charactor 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className={styles.MakeChaButton_div}>
            <button className={styles.MakeChaButton_plusButton} onClick={openModal}>+</button>
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
            <div>
            <ul className={styles.MakeChaButton_ul}>
                {Array.isArray(charactors) && charactors.map(({ id, charactor }, index) => (
                    <li key={id} className={styles.MakeChaButton_li} onDoubleClick={() => handleDoubleClick(index)}>
                        {charactor}
                        <button onClick={() => handleDelete(index)} className={styles.deleteButton}>삭제</button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default MakeChaButton;
