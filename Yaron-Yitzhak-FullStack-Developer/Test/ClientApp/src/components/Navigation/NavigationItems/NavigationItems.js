import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className="navigation-items">
            <NavigationItem link="/">Main</NavigationItem>
            <NavigationItem link="/favorites">Favorites</NavigationItem>
        </ul>
    );
}

export default navigationItems;