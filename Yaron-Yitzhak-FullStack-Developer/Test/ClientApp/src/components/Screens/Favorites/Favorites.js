import React, { Component } from 'react';

import './Favorites.css';
import LocationsList from '../../LocationsList/LocationsList';
import LocationInfo from '../../LocationInfo/LocationInfo';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

class Favorites extends Component {
    state = {
        locations: [],
        selectedLocation: null,
        error: null
    };

    componentDidMount() {
        this.getUserFavoritesLocations();
    }

    getUserFavoritesLocations = () => {
        // After getting the results, we need to create a card for each loction in results.
        fetch(`api/Weather/GetAllFavorites`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ locations: response });
            })
            .catch(e => {
                this.setState({ error: e });
            });
    }

    selectLocationHandler = (locationId) => {
        const { locations } = this.state;

        let selectedLocation = null;

        // Gets the selected location from the search results.
        for (let i = 0; i < locations.length; i++) {
            const currentLocation = locations[i];

            if (currentLocation.key === locationId) {
                selectedLocation = currentLocation;
                break;
            }
        }

        this.setState({ selectedLocation: selectedLocation });
    }


    closeErrorMessage = () => {
        this.setState({ error: null });
    }


    render() {
        const { selectLocationHandler, closeErrorMessage } = this;
        const { locations, selectedLocation, error } = this.state;

        let errorJSX = null;
        if (error) {
            errorJSX = (
                <ErrorMessage content={error} onClose={closeErrorMessage} />
            );
        }


        return (
            <div>
                <div className="favorites-results-container">
                    <label>You have {locations.length} favorites locations</label>
                </div>
                
                <div className="favorites-container">
                    <LocationsList list={locations} onLocationSelection={selectLocationHandler} />
                    <LocationInfo location={selectedLocation} isFavorite={true} />
                </div>

                {errorJSX}
            </div>
        );
    }
}

export default Favorites;