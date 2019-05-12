
import { ApplicationRoot } from 'metaf-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
    <ApplicationRoot><App /></ApplicationRoot>,
    document.getElementById('root') as HTMLElement,
);
