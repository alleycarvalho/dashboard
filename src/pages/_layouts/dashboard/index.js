import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Alert } from 'antd';
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
  const [itemMenu, setItemMenu] = useState('sub1-1');
  const token = useSelector((state) => state.auth.token);
  const firstUsers = useSelector((state) => state.users.firstUsers);
  const loading = useSelector((state) => state.utilities.loading);

  const dispatch = useDispatch();

  const { path } = children.props.match;

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [token]);

  useEffect(() => {
    if (path.includes('create')) {
      setItemMenu('sub1-2');
    } else if (!path.includes('update')) {
      setItemMenu('sub1-1');
    }
  }, [path]);

  useEffect(() => {
    dispatch(usersThunks.getFirstUsers());
  }, [dispatch, loading]);

  const changeItemMenu = (e) => {
    setItemMenu(e.key);
  };

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

        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={['sub1']}
          defaultSelectedKeys={[itemMenu]}
          selectedKeys={[itemMenu]}
          onSelect={changeItemMenu}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <UsergroupAddOutlined />
                <span>Usuários</span>
              </span>
            }
          >
            <Menu.Item key="sub1-1" onClick={() => changePage('users')}>
              Todos Usuários
            </Menu.Item>
            <Menu.Item key="sub1-2" onClick={() => changePage('users/create')}>
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
                key={`sub2-${user.id}`}
                className="quick-access"
                onClick={() => changePage(`users/${user.id}/update`)}
              >
                {`${user.first_name} ${user.last_name}`}
              </Menu.Item>
            ))}
          </SubMenu>

          <Menu.Item key="sub3" onClick={handleLogout}>
            <PoweroffOutlined />
            <span>Sair</span>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content className="layout-content">
          {!token && (
            <Alert
              type="warning"
              className="page-alert"
              message="Forneça o token de acesso do GoRest Api!"
            />
          )}

          {children}
        </Content>

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
