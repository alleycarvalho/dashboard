import { createActions, createReducer } from 'reduxsauce';

/**
 * Creating action types and creators
 */
export const { Types, Creators } = createActions({
  setLoading: ['status'],
});

/**
 * Creating reducer handlers
 */
const INITIAL_STATE = {
  loading: false,
};

const setLoading = (state = INITIAL_STATE, action) => {
  state.loading = action.status;

  return state;
};

/**
 * Creating reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.SET_LOADING]: setLoading,
});
