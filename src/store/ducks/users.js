import { createActions, createReducer } from 'reduxsauce';

/**
 * Creating action types and creators
 */
export const { Types, Creators } = createActions({
  listAll: ['users'],
  listFirstUsers: ['users'],
  show: ['user'],
  destroy: ['id'],
});

/**
 * Creating reducer handlers
 */
const INITIAL_STATE = {
  list: [],
  listData: {},
  firstUsers: [],
  user: {},
};

const getAllUsers = (state = INITIAL_STATE, action) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _meta, result } = action.users;

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
  }

  return state;
};

const destroy = (state = INITIAL_STATE, action) => {
  // eslint-disable-next-line no-underscore-dangle
  const { id } = action;

  state.list = state.list.filter((item) => item.id !== id);

  return state;
};

/**
 * Creating reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.LIST_ALL]: getAllUsers,
  [Types.LIST_FIRST_USERS]: getFirstUsers,
  [Types.SHOW]: getUser,
  [Types.DESTROY]: destroy,
});
