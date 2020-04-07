import { createActions, createReducer } from 'reduxsauce';

/**
 * Creating action types and creators
 */
export const { Types, Creators } = createActions({
  listAll: ['users'],
  listFirstUsers: ['users'],
  show: ['user'],
  store: ['user'],
  update: ['user'],
  destroy: ['user'],
});

/**
 * Creating reducer handlers
 */
const INITIAL_STATE = {
  alert: false,
  list: [],
  listData: {},
  firstUsers: [],
  user: {},
};

const getAllUsers = (state = INITIAL_STATE, action) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _meta, result } = action.users;

  state.alert = false;
  state.user = {};

  if (_meta.success) {
    const { totalCount, pageCount, currentPage, perPage } = _meta;

    state.list = result;
    state.listData = {
      totalCount,
      pageCount,
      currentPage,
      perPage,
    };
  }

  return state;
};

const getFirstUsers = (state = INITIAL_STATE, action) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _meta, result } = action.users;

  if (_meta.success) {
    state.firstUsers = result.slice(0, 5);
  }

  return state;
};

const getUser = (state = INITIAL_STATE, action) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _meta, result } = action.user;

  state.alert = false;

  if (_meta.success) {
    // eslint-disable-next-line camelcase
    const { id, first_name, last_name, gender, email, phone, status } = result;

    state.user = {
      id,
      first_name,
      last_name,
      gender,
      email,
      phone,
      status,
    };
  } else {
    let message = 'Ocorreu um erro.';

    switch (_meta.code) {
      case 401:
        message = 'Operação não autorizada!';
        break;
      case 404:
        message = 'Usuário não encontrado!';
        break;
      default:
    }

    state.alert = {
      type: 'error',
      message,
    };
  }

  return state;
};

const store = (state = INITIAL_STATE, action) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _meta } = action.user;

  if (_meta.success) {
    state.alert = {
      type: 'success',
      message: 'Usuário cadastrado com sucesso!',
    };
  } else {
    let message = 'Ocorreu um erro.';

    switch (_meta.code) {
      case 401:
        message = 'Operação não autorizada!';
        break;
      case 422:
        message = 'O e-mail já existe no sistema!';
        break;
      default:
    }

    state.alert = {
      type: 'error',
      message,
    };
  }

  return state;
};

const update = (state = INITIAL_STATE, action) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _meta } = action.user;

  if (_meta.success) {
    state.alert = {
      type: 'success',
      message: 'Usuário atualizado com sucesso!',
    };
  } else {
    let message = 'Ocorreu um erro.';

    switch (_meta.code) {
      case 401:
        message = 'Operação não autorizada!';
        break;
      case 422:
        message = 'O e-mail já existe no sistema!';
        break;
      default:
    }

    state.alert = {
      type: 'error',
      message,
    };
  }

  return state;
};

const destroy = (state = INITIAL_STATE, action) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _meta } = action.user;

  if (_meta.success) {
    state.alert = {
      type: 'success',
      message: 'Usuário removido com sucesso!',
    };
  } else {
    let message = 'Ocorreu um erro.';

    switch (_meta.code) {
      case 401:
        message = 'Operação não autorizada!';
        break;
      default:
    }

    state.alert = {
      type: 'error',
      message,
    };
  }

  return state;
};

/**
 * Creating reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.LIST_ALL]: getAllUsers,
  [Types.LIST_FIRST_USERS]: getFirstUsers,
  [Types.SHOW]: getUser,
  [Types.STORE]: store,
  [Types.UPDATE]: update,
  [Types.DESTROY]: destroy,
});
