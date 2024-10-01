// Footer.js
import React from 'react';
import './Footer.css'; // 스타일을 추가하고 싶으면 이 파일을 만들어 사용할 수 있습니다.

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 My Website. All rights reserved.</p>
            <ul>
                <li>
                    <Link to="/Main">
                        <img src="../homeButton." alt="Home" className="footer-image" />
                    </Link>
                    <Link to="/Edit">
                        <img src="../EditButton." alt="Edit" className="footer-image" />
                    </Link>
                    <Link to="/Card">
                        <img src="../CardButton." alt="Card" className="footer-image" />
                    </Link>
                    <Link to="/MyPage">
                        <img src="../MyPageButton." alt="MyPage" className="footer-image" />
                    </Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
