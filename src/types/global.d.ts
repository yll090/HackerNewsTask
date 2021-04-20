declare type HNAuthor = {
  id: string;
  karma: number;
};

declare type HNItem = {
  by: string;
  id: number;
  title: string;
  url: string;
  time: number;
  score: number;
  author: HNAuthor;
};

declare type Action = {
  type: string;
  payload?: any;
};

declare type AppState = {
  topStoriesReducer: TopStoriesState;
};

declare type TopStoriesState = {
  topStories: Array<HNItem>;
  isFetching: boolean;
  error: string | null;
};
