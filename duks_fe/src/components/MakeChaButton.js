import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './MakeChaButton.module.css'; // CSS 모듈 임포트

const MakeChaButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [abilities, setAbilities] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        Modal.setAppElement('#root');
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
        <div className={styles.MakeChaButton_div}>
            {!abilities.length && (
                <button className={styles.MakeChaButton_plusButton} onClick={openModal}>+</button>
            )}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.MakeChaButton_AbilityModal}>
                <h2 className={styles.MakeChaButton_h2}>{isEditing ? '성격을 수정해주세요' : '성격을 알려주세요!'}</h2>
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
                    <button type="submit" className={styles.MakeChaButton_button}>
                        {isEditing ? '수정' : '등록'}
                    </button>
                    <button type="button" onClick={closeModal} className={styles.MakeChaButton_button}>닫기</button>
                </form>
            </Modal>
            <div>
                <ul className={styles.MakeChaButton_ul}>
                    {abilities.map((ability, index) => (
                        <li key={index} className={styles.MakeChaButton_li} onDoubleClick={() => handleDoubleClick(index)}>
                            {ability.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MakeChaButton;
