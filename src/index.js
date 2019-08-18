import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import RouterApp from "./routes/index"
const  hist = createBrowserHistory();


ReactDOM.render(
    <Router history={hist}>
        <RouterApp/>
    </Router>
    , document.getElementById('root'));
