import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, Popconfirm } from 'antd';
import { toast } from 'react-toastify';

import './styles.css';

import { useDispatch, useSelector } from 'react-redux';

import { usersThunks } from '~/store/thunks/users';

import history from '~/services/history';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const initialData = {
  first_name: '',
  last_name: '',
  gender: 'male',
  email: '',
  phone: '',
  status: 'active',
};

const UsersForm = ({ updating }) => {
  const [form] = Form.useForm();

  const alert = useSelector((state) => state.users.alert);
  const loading = useSelector((state) => state.utilities.loading);
  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const values = form.getFieldsValue();

    if (updating) {
      dispatch(usersThunks.updateUser(values, user.id));
    } else {
      dispatch(usersThunks.createUser(values));
    }
  };

  useEffect(() => {
    const { type, message } = alert;

    if (type === 'success') {
      history.push('/dashboard/users');
    } else if (type === 'error') {
      toast(message, { type });
    }
  }, [alert]);

  useEffect(() => {
    const handleFill = (data) => {
      form.setFieldsValue(data);
    };

    const formData = updating ? user : initialData;

    handleFill(formData);
  }, [form, updating, user]);

  return (
    <Form
      {...layout}
      name="form-user"
      className="page-form"
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item wrapperCol={{ span: 24 }} className="form-title">
        Informações do Usuário
      </Form.Item>

      <Form.Item
        name="first_name"
        label="Nome:"
        rules={[
          {
            required: true,
            message: 'Preencha o primeiro nome!',
          },
        ]}
      >
        <Input placeholder="Primeiro nome" size="large" disabled={loading} />
      </Form.Item>

      <Form.Item
        name="last_name"
        label="Sobrenome:"
        rules={[
          {
            required: true,
            message: 'Preencha o sobrenome!',
          },
        ]}
      >
        <Input placeholder="Sobrenome" size="large" disabled={loading} />
      </Form.Item>

      <Form.Item name="gender" label="Sexo:">
        <Select size="large" disabled={loading}>
          <Option value="female">Feminino</Option>
          <Option value="male">Masculino</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail:"
        rules={[
          {
            required: true,
            message: 'Preencha o e-mail!',
          },
        ]}
      >
        <Input
          type="email"
          placeholder="E-mail"
          size="large"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item name="phone" label="Telefone:">
        <Input placeholder="Telefone" size="large" disabled={loading} />
      </Form.Item>

      <Form.Item name="status" label="Status:">
        <Select size="large" disabled={loading}>
          <Option value="active">Ativo</Option>
          <Option value="inactive">Inativo</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="page-form-button"
          loading={loading}
          disabled={loading}
        >
          {updating ? 'Atualizar' : 'Cadastrar'}
        </Button>

        {updating && (
          <Popconfirm
            title={`ID ${user.id}: deseja excluir？`}
            okText="Sim"
            cancelText="Não"
            onConfirm={() => dispatch(usersThunks.deleteUser(user.id))}
          >
            <Button
              type="danger"
              size="large"
              className="btn-remove"
              loading={loading}
              disabled={loading}
            >
              Excluir
            </Button>
          </Popconfirm>
        )}
      </Form.Item>
    </Form>
  );
};

UsersForm.propTypes = {
  updating: PropTypes.bool,
};

UsersForm.defaultProps = {
  updating: false,
};

export default UsersForm;
