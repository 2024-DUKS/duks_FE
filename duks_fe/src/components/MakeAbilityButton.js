import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './MakeAbilityButton.css';

const MakeAbilityButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [selectedOption, setSelectedOption] = useState('하');
    const [abilities, setAbilities] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    // react-modal 초기 설정
    useEffect(() => {
        Modal.setAppElement('#root'); // App 컴포넌트가 렌더링되는 최상위 요소
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // 새로운 능력 등록
        setAbilities([...abilities, { text: inputText, level: selectedOption }]);
        resetForm();
        closeModal();
    };

    const handleDoubleClick = (index) => {
        setEditingIndex(index);
        setInputText(abilities[index].text);
        setSelectedOption(abilities[index].level);
        setIsEditing(true);
        openModal();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedAbilities = [...abilities];
        updatedAbilities[editingIndex] = { text: inputText, level: selectedOption };
        setAbilities(updatedAbilities);
        resetForm();
        setIsEditing(false);
        closeModal();
    };

    const resetForm = () => {
        setInputText('');
        setSelectedOption('하');
    };

    return (
        <div>
            {!abilities.length && <button className="plusButton" onClick={openModal}>+</button>}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="AbilityModal">
                <h2>{isEditing ? '능력을 수정해주세요' : '능력을 등록해주세요'}</h2>
                <form onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
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
                    <button type="submit">{isEditing ? '수정' : '등록'}</button>
                    <button type="button" onClick={closeModal}>닫기</button>
                </form>
            </Modal>
            <ul className="abilityList">
                {abilities.map((ability, index) => (
                    <li key={index} onDoubleClick={() => handleDoubleClick(index)} className="abilityItem">
                        <span className="abilityText">{ability.text}</span>
                        {/* ability.level에 따라 체크 표시된 라디오 버튼 렌더링 */}
                        <label className="radioLabel">
                            <input type="radio"
                                value="하"
                                checked={ability.level === '하'} readOnly /> 하
                        </label>
                        <label className="radioLabel">
                            <input type="radio"
                                value="중"
                                checked={ability.level === '중'} readOnly /> 중
                        </label>
                        <label className="radioLabel">
                            <input type="radio"
                                value="상"
                                checked={ability.level === '상'} readOnly /> 상
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MakeAbilityButton;
