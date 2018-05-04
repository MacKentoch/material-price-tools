// @flow

// #region imports
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import agencies from './agencies';
import categories from './categories';
import prices from './prices';
// #endregion

export const reducers = { agencies, categories, prices };

export default combineReducers({
  ...reducers,
  routing: routerReducer,
});
