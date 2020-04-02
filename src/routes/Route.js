import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import DashboardLayout from '../pages/_layouts/dashboard';
import DefaultLayout from '../pages/_layouts/default';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const authenticated = false;

  if (!authenticated && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (authenticated && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = authenticated ? DashboardLayout : DefaultLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
