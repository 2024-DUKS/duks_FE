import React from 'react';
import { Link } from 'react-router-dom';
import cardButton from '../img/cardButton.png';
import editButton from '../img/editButton.png';
import homeButton from '../img/homeButton.png';
import myPageButton from '../img/myPageButton.png';



const Footer = () => {
    return (
        <footer className="footer" style={footerStyle}>
            <ul>
                <li>
                    <Link to="/Main">
                        <img src={homeButton} alt="My Image" className="footer-image"/>
                    </Link>
                    <Link to="/Edit">
                        <img src={editButton} alt="My Image" className="footer-image"/>
                    </Link>
                    <Link to="/Card">
                        <img src={cardButton} alt="My Image" className="footer-image"/>
                    </Link>
                    <Link to="/MyPage">
                        <img src={myPageButton} alt="My Image" className="footer-image"/>
                    </Link>
                </li>
            </ul>
        </footer>
    );
};

const footerStyle = {
    position: 'fixed',
    left: '0',
    bottom: '40px',
    width: '100%',
};


export default Footer;
