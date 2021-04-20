import {createStore, applyMiddleware} from 'redux';
import app from './index';
import thunk from 'redux-thunk';

const configureStore = () => {
  let store = createStore(app, applyMiddleware(thunk));
  return store;
};
export default configureStore;
