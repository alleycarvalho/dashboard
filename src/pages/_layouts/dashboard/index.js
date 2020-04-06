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

import { usersThunks } from '~/store/thunks/users';

import history from '~/services/history';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const DashboardLayout = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const firstUsers = useSelector((state) => state.users.firstUsers);
  const loading = useSelector((state) => state.users.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [token]);

  useEffect(() => {
    dispatch(usersThunks.getFirstUsers());
  }, [dispatch, loading]);

  const changePage = (slug) => {
    history.push(`/dashboard/${slug}`);
  };

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
            <Menu.Item key="1" onClick={() => changePage('users')}>
              Todos Usuários
            </Menu.Item>
            <Menu.Item key="2" onClick={() => changePage('users/create')}>
              Novo Usuário
            </Menu.Item>
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
            {firstUsers.map((user) => (
              <Menu.Item
                key={user.id}
                className="quick-access"
                onClick={() => changePage(`users/${user.id}/update`)}
              >
                {`${user.first_name} ${user.last_name}`}
              </Menu.Item>
            ))}
          </SubMenu>

          <Menu.Item key="3" onClick={handleLogout}>
            <PoweroffOutlined />
            <span>Sair</span>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content className="layout-content">{children}</Content>

        {/* <Footer className="layout-footer">
          Criado por <strong>Alley M. Carvalho</strong>
        </Footer> */}
      </Layout>
    </Layout>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DashboardLayout;
