import React from 'react';

import './Location.css';

const location = (props) => {
    const { id, name, onClick } = props;

    const clickHandler = () => {
        onClick(id);
    }

    return (
        <div className="location-container" onClick={clickHandler}>
            {name}
        </div>
    );
}

export default location;