import React from 'react';

import './Layout.css';
import Aux from '../../hoc/Auxilary/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => {
    return (
        <Aux>
            <Toolbar />

            <main className="layout-content">{props.children}</main>
        </Aux>
    );
}

export default layout;