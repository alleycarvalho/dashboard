import api from '~/services/api';
import { Creators as UsersActions } from '~/store/ducks/users';

const usersThunks = {
  getAll: (page = 1) => (dispatch) => {
    dispatch(UsersActions.loading(true));

    api
      .get(`users?page=${page}`)
      .then((users) => dispatch(UsersActions.listAll(users.data)))
      .finally(() => dispatch(UsersActions.loading(false)));
  },

  getUser: (id) => (dispatch) => {
    dispatch(UsersActions.loading(true));

    api
      .get(`users/${id}`)
      .then((user) => dispatch(UsersActions.show(user.data)))
      .finally(() => dispatch(UsersActions.loading(false)));
  },

  createUser: (data) => (dispatch) => {
    dispatch(UsersActions.loading(true));

    api
      .post('users', data)
      .then((user) => dispatch(UsersActions.store(user.data)))
      .finally(() => dispatch(UsersActions.loading(false)));
  },

  updateUser: (data, id) => (dispatch) => {
    dispatch(UsersActions.loading(true));

    api
      .put(`users/${id}`, data)
      .then((user) => dispatch(UsersActions.update(user.data)))
      .finally(() => dispatch(UsersActions.loading(false)));
  },

  deleteUser: (id) => (dispatch) => {
    dispatch(UsersActions.loading(true));

    api
      .delete(`users/${id}`)
      .then((user) => dispatch(UsersActions.destroy(user.data)))
      .finally(() => dispatch(UsersActions.loading(false)));
  },
};

export { usersThunks };
