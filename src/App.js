import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './global.css';
import 'react-toastify/dist/ReactToastify.min.css';

import Routes from './routes';
import history from './services/history';

import store from './store';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Routes />
      <ToastContainer />
    </Router>
  </Provider>
);

export default App;
