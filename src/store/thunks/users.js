import api from '~/services/api';
import { Creators as UsersActions } from '~/store/ducks/users';
import { Creators as UtilitiesActions } from '~/store/ducks/utilities';

import history from '~/services/history';

const usersThunks = {
  getAll: (page = 1, term = '') => async (dispatch) => {
    dispatch(UtilitiesActions.setLoading(true));

    await api
      .get(`users?page=${page}&first_name=${term}`)
      .then((users) => dispatch(UsersActions.listAll(users.data)))
      .finally(() => dispatch(UtilitiesActions.setLoading(false)));
  },

  getFirstUsers: () => async (dispatch) => {
    await api
      .get(`users`)
      .then((users) => dispatch(UsersActions.listFirstUsers(users.data)))
      .finally();
  },

  getUser: (id) => async (dispatch) => {
    dispatch(UtilitiesActions.setLoading(true));

    await api
      .get(`users/${id}`)
      .then((user) => dispatch(UsersActions.show(user.data)))
      .finally(() => dispatch(UtilitiesActions.setLoading(false)));
  },

  createUser: (data) => async (dispatch) => {
    dispatch(UtilitiesActions.setLoading(true));

    await api
      .post('users', data)
      .then((user) => {
        const { _meta } = user.data;

        dispatch(UtilitiesActions.setMessage(_meta.code));

        if (_meta.success) {
          history.push('/dashboard/users');
        }
      })
      .finally(() => dispatch(UtilitiesActions.setLoading(false)));
  },

  updateUser: (data, id) => async (dispatch) => {
    dispatch(UtilitiesActions.setLoading(true));

    await api
      .put(`users/${id}`, data)
      .then((user) => {
        const { _meta } = user.data;

        dispatch(UtilitiesActions.setMessage(_meta.code));
      })
      .finally(() => dispatch(UtilitiesActions.setLoading(false)));
  },

  deleteUser: (id) => async (dispatch) => {
    dispatch(UtilitiesActions.setLoading(true));

    await api
      .delete(`users/${id}`)
      .then(async (user) => {
        const { _meta } = user.data;

        if (_meta.success) {
          await dispatch(UsersActions.destroy(id));

          history.push('/dashboard/users');
        }

        dispatch(UtilitiesActions.setMessage(_meta.code));
      })
      .finally(() => dispatch(UtilitiesActions.setLoading(false)));
  },
};

export { usersThunks };
