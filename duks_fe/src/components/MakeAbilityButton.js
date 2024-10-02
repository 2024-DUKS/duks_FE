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
        setInputText(e.target.value);
    };

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        // 새로운 능력 등록
        setAbilities([...abilities, { text: inputText, level: selectedOption }]);
        setInputText('');
        setSelectedOption('하');
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
        setInputText('');
        setSelectedOption('하');
        setIsEditing(false);
        closeModal();
    };

    return (
        <div>
            {!abilities.length && <button className="plusButton" onClick={openModal}>+</button>}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="AbilityModal">
                <h2>{isEditing ? '능력을 수정해주세요' : '능력을 등록해주세요'}</h2>
                <form onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
                    <div>
                        <label>
                            <input type="text" value={inputText} onChange={handleInputChange} required />
                        </label>
                    </div>
                    <div>
                        <label>
                            하<input type="radio" value="하" 
                                checked={selectedOption === '하'} onChange={handleRadioChange}/>
                        </label>
                        <label>
                            중<input
                                type="radio" value="중"
                                checked={selectedOption === '중'} onChange={handleRadioChange}/>
                        </label>
                        <label>
                            상<input type="radio" value="상"
                                checked={selectedOption === '상'} onChange={handleRadioChange}/>
                        </label>
                    </div>
                    <button type="submit">{isEditing ? '수정' : '등록'}</button>
                    <button onClick={closeModal}>닫기</button>
                </form>
                
            </Modal>
            <div>
                <ul>
                    {abilities.map((ability, index) => (
                        <li key={index} onDoubleClick={() => handleDoubleClick(index)}>
                            {`${ability.text} - ${ability.level}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MakeAbilityButton;
