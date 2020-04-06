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

  createUser: (data) => (dispatch) => {
    dispatch(UsersActions.loading(true));

    api
      .post('users', data)
      .then((user) => dispatch(UsersActions.store(user.data)))
      .finally(() => dispatch(UsersActions.loading(false)));
  },
};

export { usersThunks };
