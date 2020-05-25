import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import 'semantic-ui-css/semantic.min.css';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

const rootElement = document.getElementById('root');
ReactDOM.render(app, rootElement);


