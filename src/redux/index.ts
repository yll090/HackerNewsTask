import {combineReducers} from 'redux';
import topStoriesReducer from './topStoriesReducer';

const rootReducer = combineReducers({
  topStoriesReducer: topStoriesReducer,
});

export default rootReducer;
