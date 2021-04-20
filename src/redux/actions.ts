import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
} from './constants';
import {Dispatch} from 'redux';

import {
  fetchAuthorDetails,
  fetchItemDetails,
  fetchTopStoriesIDs,
} from '../networking/api';

import {isHNItem, sortByScore, MAX_ITEMS} from '../helpers/helpers';

declare type HNItemResponse = {
  id: number;
  title: string;
  url: string;
  time: number;
  score: number;
  by: string;
};

export const getData = () => {
  return {
    type: FETCHING_DATA,
  };
};

export const getTopStoriesSuccess = (data: Array<HNItem>) => {
  return {
    type: FETCHING_DATA_SUCCESS,
    payload: data,
  };
};

export const getTopStoriesFailure = (error: string) => {
  return {
    type: FETCHING_DATA_FAILURE,
    payload: error,
  };
};

export const fetchStories = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getData());
    const response: Response = await fetchTopStoriesIDs();
    const newTopStoriesIds: Array<number> = await response.json();
    const promises = [];
    for (let i = 0; i < Math.min(MAX_ITEMS, newTopStoriesIds.length); i++) {
      const id: number = (newTopStoriesIds.length * Math.random()) | 0;
      promises.push(fetchItemDetailsWrapper(newTopStoriesIds[id]));
    }
    Promise.all(promises)
      .then(stories => {
        const sorted = stories.filter(isHNItem).sort(sortByScore);
        dispatch(getTopStoriesSuccess(sorted));
      })
      .catch(() => {
        dispatch(getTopStoriesFailure(`Error fetching story details`));
      });
  } catch (e) {
    dispatch(getTopStoriesFailure(`Error fetching stories`));
  }
};

const fetchItemDetailsWrapper = async (
  itemId: number,
): Promise<HNItem | undefined> => {
  let itemToUpdate: HNItem | undefined = undefined;
  const detailedItemResult: Response = await fetchItemDetails(itemId);
  const detailedItem: HNItemResponse = await detailedItemResult.json();
  if (detailedItem && detailedItem.by) {
    const authorResult: Response = await fetchAuthorDetails(detailedItem.by);
    const author: HNAuthor = await authorResult.json();
    itemToUpdate = {
      ...detailedItem,
      author: author,
    };
    return itemToUpdate;
  }
};
