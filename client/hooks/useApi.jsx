import {
  API_PLATFORMS,
  API_GAMES,
  API_GAME,
  API_GAME_SCREENSHOTS,
  SORTED_TYPE,
  BATCH_GAMES_COUNT
} from 'helpers/constants';
import { printf } from 'helpers/string';

import tokens from 'root/tokens.json';

export const useApi = () => {
  const fetchResult = async (query) => {
    const response = await fetch(query)
      .then(response => response.ok ? response : null)
      .catch(error => new Error(`API fetch query error! ${error}`));

    return response ? response.json() : {};
  };

  const fetchPlatforms = async () => {
    const platforms = await fetchResult(`${API_PLATFORMS}?key=${tokens.rawgToken}`);

    return [
      { id: 0, name: 'Все' },
      ...platforms.results?.map(({ id, name }) => ({ id, name })),
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

    const games = await fetchResult(query.join(''));

    return {
      ...games,
      results: Array.isArray(games?.results) ? games?.results : [],
    };
  };

  const fetchGameInfo = async (slug) =>
    await fetchResult(`${printf(API_GAME, slug)}?key=${tokens.rawgToken}`);

  const fetchGameScreenshots = async (slug) =>
    await fetchResult(`${printf(API_GAME_SCREENSHOTS, slug)}?key=${tokens.rawgToken}`);

  return {
    fetchPlatforms,
    fetchGames,
    fetchGameInfo,
    fetchGameScreenshots,
  };
};
