import React from 'react';

import './Logo.css';
import LogoImg from '../../../assets/rc_logo.png';

const logo = (props) => {
    return (
        <div className="logo-container">
            <img className="logo-image" src={LogoImg} alt="logo" />
        </div>
    );
}

export default logo;