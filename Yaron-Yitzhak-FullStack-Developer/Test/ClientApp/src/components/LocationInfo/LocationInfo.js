import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import './LocationInfo.css';

const locationInfo = (props) => {
    const { location, onButtonClickHandler } = props;

    let locationJSX = null;

    if (location) {
        let buttonText = "Add To Favorites";

        if (location.isOnFavorites) {
            buttonText = "Remove From Favorites";
        }

        locationJSX = (
            <div className="location-info-card">
                <div className="location-info-details">
                    <div>{location.name}</div>
                    <div>{location.temperature} ℃</div>
                    <div>{location.weatherText}</div>
                </div>

                <div className="location-info-favorites">
                    <Button basic color='red' onClick={onButtonClickHandler}>
                        {buttonText}
                        <Icon name="heart" color="red" style={{ marginLeft: '5px' }} />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="location-info-container">
            {locationJSX}
        </div>
    );
}

export default locationInfo ;