import { createActions, createReducer } from 'reduxsauce';
import { toast } from 'react-toastify';

/**
 * Creating action types and creators
 */
export const { Types, Creators } = createActions({
  setLoading: ['status'],
  setMessage: ['code'],
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

const showMessage = (state = INITIAL_STATE, action) => {
  let msg = 'Ops, ocorreu um erro no sistema.';
  let type = 'error';

  switch (action.code) {
    case 200:
    case 201:
      msg = 'Usuário salvo com sucesso!';
      type = 'success';
      break;
    case 204:
      msg = 'Usuário removido com sucesso!';
      type = 'success';
      break;
    case 401:
      msg = 'Operação não autorizada!';
      break;
    case 404:
      msg = 'Usuário não encontrado!';
      break;
    case 422:
      msg = 'O e-mail já está sendo utilizado!';
      break;
    default:
  }

  toast(msg, { type });

  return state;
};

/**
 * Creating reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.SET_LOADING]: setLoading,
  [Types.SET_MESSAGE]: showMessage,
});
