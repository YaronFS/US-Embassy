import React, { Component } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncMain = asyncComponent(() => {
    return import('./components/Screens/Main/Main');
});

const asyncFavorites = asyncComponent(() => {
    return import('./components/Screens/Favorites/Favorites');
});

class App extends Component {

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/favorites" component={asyncFavorites} />
                    <Route path="/" component={asyncMain} />
                </Switch>
            </Layout>
        );
    }

}

export default withRouter(App);