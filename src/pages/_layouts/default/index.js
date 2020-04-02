import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import './styles.css';

const DefaultLayout = ({ children }) => (
  <Layout className="wrapper">{children}</Layout>
);

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultLayout;
