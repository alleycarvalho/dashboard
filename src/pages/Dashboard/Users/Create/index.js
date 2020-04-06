import React from 'react';
import { Layout, PageHeader, Alert } from 'antd';

import { useSelector } from 'react-redux';

import history from '~/services/history';

import UsersForm from '~/pages/Dashboard/Users/_partials/Form';

const UsersCreate = () => {
  const authorized = useSelector((state) => state.users.authorized);

  return (
    <Layout>
      <PageHeader
        className="page-header"
        title="Usuários"
        subTitle="Cadastrar Novo"
        onBack={() => history.push('/dashboard/users')}
      />

      <Layout className="page-content">
        {!authorized && (
          <Alert
            type="warning"
            className="page-alert"
            message="Forneça o token de acesso do GoRest Api!"
          />
        )}

        <UsersForm />
      </Layout>
    </Layout>
  );
};

export default UsersCreate;
