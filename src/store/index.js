import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './ducks';

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
