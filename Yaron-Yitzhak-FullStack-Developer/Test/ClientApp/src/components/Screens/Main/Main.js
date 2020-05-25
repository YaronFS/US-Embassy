import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';

import './Main.css';
import LocationsList from '../../LocationsList/LocationsList';
import LocationInfo from '../../LocationInfo/LocationInfo';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

class Main extends Component {
    state = {
        searchInput: '',
        searchResults: [],
        selectedLocation: null,
        error: null
    };

    onSearchInputChange = (event, data) => {
        event.preventDefault();

        const newValue = event.target.value;

        this.setState({ searchInput: newValue });
    }

    searchHandler = () => {
        this.setState({ selectedLocation: null });

        const { searchInput } = this.state;

        // After getting the results, we need to create a card for each location in results.
        fetch(`api/Weather/Search?query=${searchInput}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ searchResults: response });
            })
            .catch(e => {
                this.setState({ error: e });
            });


        
    }

    selectLocationHandler = (locationId) => {
        
        const { searchResults } = this.state;

        let selectedLocation = null;

        // Gets the selected location from the search results.
        for (let i = 0; i < searchResults.length; i++) {
            const currentLocation = searchResults[i];

            if (currentLocation.key === locationId) {
                selectedLocation = currentLocation;
                break;
            }
        }


        fetch(`api/Weather/GetCurrentWeather?locationId=${selectedLocation.key}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ selectedLocation: { ...selectedLocation, ...response } });
            })
            .catch(e => {
                this.setState({ error: e });
            });
    }

    onFavoritesButtonClick = () => {
        const { removeFromFavorites, addToFavorites } = this;
        const { selectedLocation } = this.state;

        // Check if current location is already in user's favorites --> We need to remove it from favorites.
        if (selectedLocation.isOnFavorites) {
            removeFromFavorites(selectedLocation);
        }
        // Here we know that current location is not in user's favorites --> We need to add it to favorites.
        else {
            addToFavorites(selectedLocation);
        }
    }

    removeFromFavorites = (location) => {
        fetch(`api/Weather/${location.key}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                this.setState({
                    selectedLocation: {
                        ...location, isOnFavorites: false
                    }
                });
            })
            .catch(e => {
                this.setState({ error: e });
            });
    }

    addToFavorites = (location) => {
        fetch('api/Weather', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                key: location.key,
                name: location.name,
                temperature: location.temperature,
                weatherText: location.weatherText
            })
        })
            .then(response => {
                this.setState({
                    selectedLocation: {
                        ...location, isOnFavorites: true
                    }
                });
            })
            .catch(e => {
                this.setState({ error: e });
            });
    }


    closeErrorMessage = () => {
        this.setState({ error: null });
    }


    render() {
        const { searchHandler, selectLocationHandler, onSearchInputChange, onFavoritesButtonClick, closeErrorMessage } = this;
        const { searchResults, selectedLocation, searchInput, error } = this.state;

        let errorJSX = null;
        if (error) {
            errorJSX = (
                <ErrorMessage content={error} onClose={closeErrorMessage} />
            );
        }

        return (
            <div className="main-container" >
                <div className="main-search-section">
                    <Button primary onClick={searchHandler} >Search</Button>
                    <Input onChange={onSearchInputChange} value={searchInput} placeholder='Please enter a location...' />
                </div>

                <div className="main-results-section">
                    <LocationsList list={searchResults} onLocationSelection={selectLocationHandler} />
                    <LocationInfo location={selectedLocation} onButtonClickHandler={onFavoritesButtonClick} />
                </div>

                {errorJSX}

            </div>
        );
    }

}

export default Main;