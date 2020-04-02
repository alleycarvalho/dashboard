import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './styles.css';

const Auth = () => (
  <Layout className="login-container">
    <section className="form">
      <Form name="login" className="login-form">
        <h1>Faça seu login</h1>

        <Form.Item
          name="username"
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
        <strong>E-mail: </strong>teste@dashboard.com.br
        <br />
        <strong>Senha: </strong>teste
      </div>

      <div className="link-back">
        <Link to="/">&laquo; Retornar para Home &raquo;</Link>
      </div>
    </section>
  </Layout>
);

export default Auth;
