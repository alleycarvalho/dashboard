import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, PageHeader, Alert } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { usersThunks } from '~/store/thunks/users';

import history from '~/services/history';

import UsersForm from '~/pages/Dashboard/Users/_partials/Form';

const UsersUpdate = ({ match }) => {
  const authorized = useSelector((state) => state.users.authorized);
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
        {!authorized && (
          <Alert
            type="warning"
            className="page-alert"
            message="Forneça o token de acesso do GoRest Api!"
          />
        )}

        <UsersForm updating={updating} />
      </Layout>
    </Layout>
  );
};

UsersUpdate.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default UsersUpdate;
