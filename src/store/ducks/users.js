import { createActions, createReducer } from 'reduxsauce';

/**
 * Creating action types and creators
 */
export const { Types, Creators } = createActions({
  listAll: ['users'],
  loading: ['status'],
});

/**
 * Creating reducer handlers
 */
const INITIAL_STATE = {
  authorized: true,
  list: [],
  listData: {},
  loading: false,
};

const getAllUsers = (state = INITIAL_STATE, action) => {
  // eslint-disable-next-line no-underscore-dangle
  const { _meta, result } = action.users;

  state.authorized = true;

  if (_meta.success) {
    const { totalCount, pageCount, currentPage, perPage } = _meta;

    state.list = result;
    state.listData = {
      totalCount,
      pageCount,
      currentPage,
      perPage,
    };
  } else {
    state.authorized = false;
  }

  return state;
};

const setLoading = (state = INITIAL_STATE, action) => {
  state.loading = action.status;

  return state;
};

/**
 * Creating reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.LIST_ALL]: getAllUsers,
  [Types.LOADING]: setLoading,
});
