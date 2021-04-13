import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { SORTING, SORTED_TYPE } from 'helpers/constants';
import SearchPanelLayout from 'layouts/SearchPanelLayout';

import { useApi } from 'client/hooks/useApi';
import { useScrollable } from 'client/hooks/useScrollable';

import Page from './Page';
import GameListLayout from '../layouts/GameListLayout';
import { usePagination } from '../../hooks/usePagination';

const ScrollableContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const MainPage = () => {
  const [platforms, setPlatforms] = useState([]);
  const [games, setGames] = useState({ prev: [], next: [] });

  const [fetchParams, setFetchParams] = useState({
    page: 1,
    platform: 0,
    ratingSorted: SORTED_TYPE.DESCENDING,
    releasedSorted: SORTED_TYPE.NONE,
    searchValue: '',
  });

  const { fetchPlatforms, fetchGames } = useApi();

  const scrollableProps = useScrollable();
  const anchor = useRef(null);

  const { loadPrevPage, loadNextPage } = usePagination({
    fetchItems: async (page) => {
      const games = await fetchGames({
        ...fetchParams,
        page,
      });

      return {
        results: games?.results || [],
        prev: games?.previous || null,
        next: games?.next || null,
      };
    },
    setItems: setGames,
    scrollableAnchor: anchor,
  });

  const updateGameList = async () => {
    const firstBatch = await fetchGames(fetchParams);
    const secondBatch = await fetchGames({
      ...fetchParams,
      page: 2,
    });

    setGames({
      prev: firstBatch?.results || prev,
      next: secondBatch?.results || next,
    });
  };

  const onSorting = (sortingType, sortingValue) => {
    if (sortingType === SORTING.RATING) {
      setFetchParams(fetchParams => ({
        ...fetchParams,
        ratingSorted: sortingValue,
        releasedSorted: SORTED_TYPE.NONE,
      }));
    }
    else if (sortingType === SORTING.RELEASED) {
      setFetchParams(fetchParams => ({
        ...fetchParams,
        ratingSorted: SORTED_TYPE.NONE,
        releasedSorted: sortingValue,
      }));
    }
  };

  const changePlatform = platform => {
    setFetchParams(fetchParams => ({
      ...fetchParams,
      platform,
    }));
  };

  const onSearchInput = searchValue => setFetchParams(fetchParams => ({
    ...fetchParams,
    searchValue,
  }));

  useEffect(async () => {
    setPlatforms(await fetchPlatforms());
  }, []);

  useEffect(() => updateGameList(), [
    fetchParams.platform,
    fetchParams.ratingSorted,
    fetchParams.releasedSorted,
  ]);

  useEffect(() => {
    if (scrollableProps.atTheTop && !scrollableProps.atTheBottom)
      loadPrevPage();

    if (!scrollableProps.atTheTop && scrollableProps.atTheBottom)
      loadNextPage();
  }, [
    scrollableProps.atTheTop,
    scrollableProps.atTheBottom,
  ]);

  return (
    <ScrollableContainer ref={scrollableProps.ref}>
      <Page title='Каталог игр'>
        <SearchPanelLayout {...{
          platforms,
          platform: fetchParams.platform,
          changePlatform,
          sorted: {
            [SORTING.RATING]: fetchParams.ratingSorted,
            [SORTING.RELEASED]: fetchParams.releasedSorted,
          },
          onSorting,
          onSearchInput,
          onSearch: updateGameList,
        }} />
        <GameListLayout {...{ games, anchor }} />
      </Page>
    </ScrollableContainer>
  );
};

export default MainPage;
