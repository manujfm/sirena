import React from 'react';
import ReactDOM from 'react-dom';
import sirena from './app';
import Main from './main';
window.$sin = sirena;
ReactDOM.render(<Main/>, document.getElementById('root'));
