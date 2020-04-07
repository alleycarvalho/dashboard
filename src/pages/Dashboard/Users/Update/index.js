import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, PageHeader } from 'antd';

import { useDispatch } from 'react-redux';

import { usersThunks } from '~/store/thunks/users';

import history from '~/services/history';

import UsersForm from '~/pages/Dashboard/Users/_partials/Form';

const UsersUpdate = ({ match }) => {
  const { id } = match.params;
  const updating = true;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersThunks.getUser(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <PageHeader
        className="page-header"
        title="Usuários"
        subTitle="Atualizar Usuário"
        onBack={() => history.push('/dashboard/users')}
      />

      <Layout className="page-content">
        <UsersForm updating={updating} />
      </Layout>
    </Layout>
  );
};

UsersUpdate.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default UsersUpdate;
