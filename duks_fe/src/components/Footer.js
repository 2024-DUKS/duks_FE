import React from 'react';
import { Link } from 'react-router-dom';
import cardButton from '../img/cardButton.png';
import editButton from '../img/editButton.png';
import homeButton from '../img/homeButton.png';
import myPageButton from '../img/myPageButton.png';
import { footerStyle, footerImage, ul } from './Footer.css';


const Footer = () => {
    return (
        <footer className="footerStyle">
            
                
                    <Link to="/Main">
                        <img src={homeButton} alt="My Image" className="footerImage"/>
                    </Link>
                    <Link to="/Edit">
                        <img src={editButton} alt="My Image" className="footerImage"/>
                    </Link>
                    <Link to="/Card">
                        <img src={cardButton} alt="My Image" className="footerImage"/>
                    </Link>
                    <Link to="/MyPage">
                        <img src={myPageButton} alt="My Image" className="footerImage"/>
                    </Link>
        
            
        </footer>
    );
};




export default Footer;
