import React from 'react';
import loginPage from "../views/loginPage";
import Dashboard from "../views/dashboard";
import { Route, Switch } from "react-router-dom";

const RouterApp = () =>
    <div>
        <Switch>
            <Route exact path={"/"} component={loginPage}/>
            <Route exact path={"/Dashboard"} component={Dashboard}/>
        </Switch>
    </div>;

export default RouterApp;
