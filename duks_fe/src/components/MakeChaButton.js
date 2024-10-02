import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './MakeAbilityButton.css'; // CSS 파일 경로는 동일하게 유지

const MakeChaButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
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
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 새로운 능력 등록
        setAbilities([...abilities, { text: inputText }]);
        setInputText('');
        closeModal();
    };

    const handleDoubleClick = (index) => {
        setEditingIndex(index);
        setInputText(abilities[index].text);
        setIsEditing(true);
        openModal();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedAbilities = [...abilities];
        updatedAbilities[editingIndex] = { text: inputText };
        setAbilities(updatedAbilities);
        setInputText('');
        setIsEditing(false);
        closeModal();
    };

    return (
        <div>
            {!abilities.length && <button className="plusButton" onClick={openModal}>+</button>}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="AbilityModal">
                <h2>{isEditing ? '성격을 수정해주세요' : '성격을 알려주세요!'}</h2>
                <form onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
                    <div>
                        <label>
                            <input type="text" value={inputText} onChange={handleInputChange} required />
                        </label>
                    </div>
                    <button type="submit">{isEditing ? '수정' : '등록'}</button>
                    <button type="button" onClick={closeModal}>닫기</button>
                </form>
            </Modal>
            <div>
                <ul>
                    {abilities.map((ability, index) => (
                        <li key={index} onDoubleClick={() => handleDoubleClick(index)}>
                            {ability.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MakeChaButton;
