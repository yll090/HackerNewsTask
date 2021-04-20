export const fetchTopStoriesIDs = (): Promise<Response> => {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$key"`,
    {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET',
    },
  );
};

export const fetchItemDetails = (storyId: number): Promise<Response> => {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  });
};

export const fetchAuthorDetails = (userId: string): Promise<Response> => {
  return fetch(`https://hacker-news.firebaseio.com/v0/user/${userId}.json`, {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  });
};
