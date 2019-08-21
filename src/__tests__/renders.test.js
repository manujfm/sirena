import React from 'react';
import ReactDOM from 'react-dom';
import sinon from "sinon"
import should from 'should';
import Main from '../main';
import LoginManager from "../controlers/LoginManager";
import sirena from "../app";

describe('Renders test', () => {

    it('reder without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Main />, div);
    });

});
