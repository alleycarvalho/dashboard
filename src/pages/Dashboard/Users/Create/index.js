import React from 'react';
import { Layout, PageHeader } from 'antd';

import history from '~/services/history';

import UsersForm from '~/pages/Dashboard/Users/_partials/Form';

const UsersCreate = () => {
  return (
    <Layout>
      <PageHeader
        className="page-header"
        title="Usuários"
        subTitle="Cadastrar Novo"
        onBack={() => history.push('/dashboard/users')}
      />

      <Layout className="page-content">
        <UsersForm />
      </Layout>
    </Layout>
  );
};

export default UsersCreate;
