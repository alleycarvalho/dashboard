import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import utilities from './utilities';

export default combineReducers({
  auth,
  users,
  utilities,
});
