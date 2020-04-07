import api from '~/services/api';
import { Creators as UsersActions } from '~/store/ducks/users';
import { Creators as UtilitiesActions } from '~/store/ducks/utilities';

const usersThunks = {
  getAll: (page = 1, term = '') => (dispatch) => {
    dispatch(UtilitiesActions.setLoading(true));

    api
      .get(`users?page=${page}&first_name=${term}`)
      .then((users) => dispatch(UsersActions.listAll(users.data)))
      .finally(() => dispatch(UtilitiesActions.setLoading(false)));
  },

  getFirstUsers: () => (dispatch) => {
    api
      .get(`users`)
      .then((users) => dispatch(UsersActions.listFirstUsers(users.data)))
      .finally();
  },

  getUser: (id) => (dispatch) => {
    dispatch(UtilitiesActions.setLoading(true));

    api
      .get(`users/${id}`)
      .then((user) => dispatch(UsersActions.show(user.data)))
      .finally(() => dispatch(UtilitiesActions.setLoading(false)));
  },

  createUser: (data) => (dispatch) => {
    dispatch(UtilitiesActions.setLoading(true));

    api
      .post('users', data)
      .then((user) => dispatch(UsersActions.store(user.data)))
      .finally(() => dispatch(UtilitiesActions.setLoading(false)));
  },

  updateUser: (data, id) => (dispatch) => {
    dispatch(UtilitiesActions.setLoading(true));

    api
      .put(`users/${id}`, data)
      .then((user) => dispatch(UsersActions.update(user.data)))
      .finally(() => dispatch(UtilitiesActions.setLoading(false)));
  },

  deleteUser: (id) => (dispatch) => {
    dispatch(UtilitiesActions.setLoading(true));

    api
      .delete(`users/${id}`)
      .then((user) => dispatch(UsersActions.destroy(user.data)))
      .finally(() => dispatch(UtilitiesActions.setLoading(false)));
  },
};

export { usersThunks };
