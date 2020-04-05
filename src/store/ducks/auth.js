import { createActions, createReducer } from 'reduxsauce';

export const credentials = {
  email: 'teste@dashboard.com.br',
  password: 'teste',
};

/**
 * Creating action types and creators
 */
export const { Types, Creators } = createActions({
  login: ['email', 'password'],
  logout: [],
});

/**
 * Creating reducer handlers
 */
const INITIAL_STATE = {
  error: null,
  token: localStorage.getItem('cmswUserToken') || null,
};

const authLogin = (state = INITIAL_STATE, action) => {
  const { email, password } = action;

  state.error = null;

  if (email === credentials.email && password === credentials.password) {
    state.token = process.env.REACT_APP_GOREST_TOKEN;

    localStorage.setItem('cmswUserToken', state.token);
  } else {
    state.error = 'Login inválido!';
  }

  return state;
};

const authLogout = (state = INITIAL_STATE) => {
  localStorage.clear();

  state.error = null;
  state.token = null;

  return state;
};

/**
 * Creating reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.LOGIN]: authLogin,
  [Types.LOGOUT]: authLogout,
});
