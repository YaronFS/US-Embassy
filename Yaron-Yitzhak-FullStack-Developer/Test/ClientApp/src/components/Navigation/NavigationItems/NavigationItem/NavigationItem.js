import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import './NavigationItem.css';

const navigationItem = (props) => {
    let navItemJSX = null;

    if (props.link) {
        navItemJSX = (
            <NavLink
                to={props.link}
                exact
                activeClassName="active">
                {props.children}
            </NavLink>
        );
    }

    return (
        <li className="navigation-item">
            {navItemJSX}
        </li>
    );
}

export default withRouter(navigationItem);