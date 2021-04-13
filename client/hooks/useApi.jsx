import PropTypes from 'prop-types';

import { API_PLATFORMS, API_GAMES, SORTED_TYPE, BATCH_GAMES_COUNT } from 'helpers/constants';

import tokens from 'root/tokens.json';

export const useApi = () => {
  const fetchResult = async (query) => {
    const response = await fetch(query)
      .catch(error => new Error(`API fetch query error! ${error}`));

    return response.json() || {};
  };

  const fetchPlatforms = async () => {
    const platforms = await fetchResult(`${API_PLATFORMS}?key=${tokens.rawgToken}`);

    return [
      { id: 0, name: 'Все' },
      ...platforms.results.map(({ id, name }) => ({ id, name })),
    ];
  };

  const fetchGames = async ({
    platform,
    searchValue,
    ratingSorted,
    releasedSorted,
    page,
  }) => {
    const query = [`${API_GAMES}?key=${tokens.rawgToken}&page_size=${BATCH_GAMES_COUNT}`];

    if (!!platform)
      query.push(`&platforms=${platform}`);
    if (!!searchValue)
      query.push(`&search=${searchValue}`);
    if (ratingSorted !== SORTED_TYPE.NONE)
      query.push(`&ordering=${ratingSorted === SORTED_TYPE.DESCENDING ? '-' : ''}rating`);
    else if (releasedSorted !== SORTED_TYPE.NONE)
      query.push(`&ordering=${releasedSorted === SORTED_TYPE.DESCENDING ? '-' : ''}released`);
    if (page > 1)
      query.push(`&page=${page}`);

    return await fetchResult(query.join(''));
  };

  return {
    fetchPlatforms,
    fetchGames,
  };
};
