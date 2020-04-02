import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Auth} />

      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
}
