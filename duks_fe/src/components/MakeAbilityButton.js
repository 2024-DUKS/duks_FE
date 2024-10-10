import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import styles from './MakeAbilityButton.module.css';

const MakeAbilityButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [selectedOption, setSelectedOption] = useState('하');
    const [abilities, setAbilities] = useState([]);

    useEffect(() => {
        Modal.setAppElement('body');
        fetchSkills();
    }, []);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('authToken');
        return { 
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${token}` 
            } 
        };
    };

    const fetchSkills = async () => {
        try {
            const userId = localStorage.getItem('userId'); // 여기에서 userId를 가져옵니다.
            const response = await axios.get(`http://localhost:5000/api/portfolios/skills?userId=${userId}`, getAuthHeaders());
            console.log('Fetched skills:', response.data);
            setAbilities(response.data);
        } catch (error) {
            console.error('스킬을 불러오는 중 오류가 발생했습니다:', error);
        }
    };

    const openModal = () => {
        resetForm();
        setModalIsOpen(true);
    };

    const closeModal = () => {
        resetForm();
        setModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        if (e.target.value.length <= 5) {
            setInputText(e.target.value);
        }
    };

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId'); // 여기에서도 userId를 가져옵니다.
            await axios.post('http://localhost:5000/api/portfolios/skills', 
                { skill: inputText, level: selectedOption, userId: userId }, // 필요하다면 userId를 요청 본문에 포함
                getAuthHeaders()
            ); 
            fetchSkills();
            closeModal();
        } catch (error) {
            console.error('스킬 추가 중 오류가 발생했습니다:', error);
        }
    };

    const handleDelete = async (id) => {
        console.log('삭제할 ID:', id); 
        if (!id) {
            console.error('삭제할 ID가 없습니다.');
            return;
        }
        try {
            const userId = localStorage.getItem('userId'); // 여기에서도 userId를 가져옵니다.
            await axios.delete(`http://localhost:5000/api/portfolios/skills/${id}?userId=${userId}`, getAuthHeaders());
            console.log(`스킬 ${id}가 삭제되었습니다.`);
            fetchSkills();
        } catch (error) {
            console.error('스킬 삭제 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
        }
    };

    const resetForm = () => {
        setInputText('');
        setSelectedOption('하');
    };

    return (
        <div>
            <div className={styles.abilityHeader}>
                <box>SKILLS</box>
                {abilities.length < 3 && ( // 스킬 개수가 3개 미만일 때만 버튼 표시
                    <button className={styles.plusButton} onClick={openModal}> + </button>
                )}
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.AbilityModal}>
                <h2>능력을 등록해주세요</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            value={inputText}
                            onChange={handleInputChange}
                            maxLength={5}
                            required
                        />
                    </label>
                    <div>
                        <label>
                            <input type="radio"
                                value="하"
                                checked={selectedOption === '하'} onChange={handleRadioChange} /> 하
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="중"
                                checked={selectedOption === '중'} onChange={handleRadioChange} /> 중
                        </label>
                        <label>
                            <input type="radio"
                                value="상"
                                checked={selectedOption === '상'} onChange={handleRadioChange} /> 상
                        </label>
                    </div>
                    <button type="submit" className={styles.makeAbilityButton}>
                        등록
                    </button>
                    <button type="button" className={styles.makeAbilityButton} onClick={closeModal}>
                        닫기
                    </button>
                </form>
            </Modal>
            <ul className={styles.abilityList}>
                {abilities.map((ability) => (
                    <li key={ability.id} className={styles.abilityItem}>
                        <button onClick={() => handleDelete(ability.id)} className={styles.deleteButton}> - </button>
                        <span className={styles.abilityText}>{ability.skill}</span>

                        <label className={styles.radioLabel}>
                            <input type="radio" value="하" checked={ability.level === '하'} readOnly /> 하
                        </label>
                        <label className={styles.radioLabel}>
                            <input type="radio" value="중" checked={ability.level === '중'} readOnly /> 중
                        </label>
                        <label className={styles.radioLabel}>
                            <input type="radio" value="상" checked={ability.level === '상'} readOnly /> 상
                        </label>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MakeAbilityButton;
