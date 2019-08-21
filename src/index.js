import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import RouterApp from './routes/index';
import store from './redux/store';
import sirena from './app';
const hist = createBrowserHistory();
window.$sin = sirena;

const rooElement =
    <Provider store={store}>
        <Router history={hist}>
            <RouterApp/>
        </Router>
    </Provider>;

ReactDOM.render(rooElement, document.getElementById('root'));
