import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Auth from '~/pages/Auth';
import Dashboard from '~/pages/Dashboard';
import Home from '~/pages/Home';
import NotFound from '~/pages/404';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Auth} />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/" component={NotFound} />
    </Switch>
  );
}
