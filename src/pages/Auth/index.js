import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as AuthActions, credentials } from '~/store/ducks/auth';

import history from '~/services/history';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      history.push('/dashboard');
    }
  }, [token]);

  const handleLogin = () => {
    dispatch(AuthActions.login(email, password));
  };

  return (
    <Layout className="login-container">
      <section className="form">
        <Form name="login" className="login-form" onFinish={handleLogin}>
          <h1>Faça seu login</h1>

          {error && <div className="login-message">{error}</div>}

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Preencha o e-mail!',
              },
            ]}
          >
            <Input
              type="email"
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Preencha a senha!',
              },
            ]}
          >
            <Input
              type="password"
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>

        <div className="login-info">
          <strong>E-mail: </strong>
          {credentials.email}
          <br />
          <strong>Senha: </strong>
          {credentials.password}
        </div>

        <div className="link-back">
          <Link to="/">&laquo; Retornar para Home &raquo;</Link>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
