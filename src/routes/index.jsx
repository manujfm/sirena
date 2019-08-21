import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loginPage from '../views/loginPage';
import Dashboard from '../views/dashboard';
import ErrorPage from '../views/ErrorPage';

const RouterApp = () =>
    <div>
        <Switch>
            <Route exact path={'/'} component={ loginPage }/>
            <Route exact path={'/Dashboard'} component={ Dashboard }/>
            <Route component={ ErrorPage }/>
        </Switch>
    </div>;

export default RouterApp;
