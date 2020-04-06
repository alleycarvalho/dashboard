import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Auth from '~/pages/Auth';
import Home from '~/pages/Home';
import NotFound from '~/pages/404';
/**
 * Dashboard Components
 */
import UsersList from '~/pages/Dashboard/Users/List';
import UsersCreate from '~/pages/Dashboard/Users/Create';
import UsersUpdate from '~/pages/Dashboard/Users/Update';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Auth} />

      <Route path="/dashboard" exact component={UsersList} isPrivate />
      <Route path="/dashboard/users" exact component={UsersList} isPrivate />
      <Route path="/dashboard/users/create" component={UsersCreate} isPrivate />
      <Route
        path="/dashboard/users/:id/update"
        component={UsersUpdate}
        isPrivate
      />

      <Route path="/" component={NotFound} />
    </Switch>
  );
}
