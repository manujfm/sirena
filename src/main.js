import React, { Component } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import RouterApp from './routes/index';
import store from './redux/store';
const hist = createBrowserHistory();

class Main extends Component {
    render () {
        return (
            <Provider store={store}>
                <Router history={hist}>
                    <RouterApp/>
                </Router>
            </Provider>
        );
    }
}

export default Main;
