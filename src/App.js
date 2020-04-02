import React from 'react';
import { Router } from 'react-router-dom';

import './global.css';

import Routes from './routes';
import history from './services/history';

const App = () => (
  <Router history={history}>
    <Routes />
  </Router>
);

export default App;
