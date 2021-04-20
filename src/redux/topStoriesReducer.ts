import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
} from './constants';

const initialState: TopStoriesState = {
  topStories: [],
  isFetching: false,
  error: null,
};

const topStoriesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        topStories: [],
        isFetching: true,
      };
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        topStories: action.payload,
      };
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default topStoriesReducer;
