import React from 'react';

import './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return (
        <header className="toolbar">
            <div className="toolbar-logo">
                <Logo />
            </div>

            <nav className="toolbar-nav-items">
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;