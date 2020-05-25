import React from 'react';

import './LocationsList.css';
import Location from './Location/Location';

const locationsList = (props) => {
    const { list, onLocationSelection } = props;

    const locationsListJSX = list.map((location) => {
        return <Location key={location.key} id={location.key} name={location.name} onClick={onLocationSelection} />
    });

    let style = {
        borderRight: '1px solid black'
    };

    if (list.length === 0) {
        style = {};
    }

    return (
        <div className="locations-list-container" style={style}>
            {locationsListJSX}
        </div>
    );
}

export default locationsList;