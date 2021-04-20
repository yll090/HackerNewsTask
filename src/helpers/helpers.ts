export const isHNItem = (argument: HNItem | undefined): argument is HNItem => {
  return argument !== undefined;
};

export const sortByScore = (a: HNItem, b: HNItem): number => a.score - b.score;

export const MAX_ITEMS = 10;
