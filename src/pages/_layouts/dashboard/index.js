import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import {
  PoweroffOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';

import './styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as AuthActions } from '~/store/ducks/auth';

import history from '~/services/history';

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const DashboardLayout = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <Layout>
      <Sider>
        <div className="logo">
          <h1>CMSW</h1>
          <span>Dashboard</span>
        </div>

        <Menu theme="dark" mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <UsergroupAddOutlined />
                <span>Usuários</span>
              </span>
            }
          >
            <Menu.Item key="1">Todos Usuários</Menu.Item>
            <Menu.Item key="2">Novo Usuário</Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub2"
            title={
              <span>
                <UserOutlined />
                <span>Acesso Rápido</span>
              </span>
            }
          >
            <Menu.Item key="u1">Usuário 01</Menu.Item>
            <Menu.Item key="u2">Usuário 02</Menu.Item>
            <Menu.Item key="u3">Usuário 03</Menu.Item>
            <Menu.Item key="u4">Usuário 04</Menu.Item>
            <Menu.Item key="u5">Usuário 05</Menu.Item>
          </SubMenu>

          <Menu.Item key="3" onClick={handleLogout}>
            <PoweroffOutlined />
            <span>Sair</span>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content className="layout-content">{children}</Content>

        <Footer className="layout-footer">
          Criado por <strong>Alley M. Carvalho</strong>
        </Footer>
      </Layout>
    </Layout>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DashboardLayout;
