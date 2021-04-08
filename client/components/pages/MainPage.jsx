import React, { useState, useEffect } from 'react';

import { API_PLATFORMS } from 'helpers/constants';
import { SORTING, SORTED_TYPE } from 'helpers/constants';
import SearchPanelLayout from 'layouts/SearchPanelLayout';

import Page from './Page';

import tokens from 'root/tokens.json';

const MainPage = () => {
  const [platforms, setPlatforms] = useState([]);
  const [platform, changePlatform] = useState(0);
  const [ratingSorted, setRatingSorted] = useState(SORTED_TYPE.DESCENDING);
  const [releaseSorted, setReleaseSorted] = useState(SORTED_TYPE.NONE);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch(`${API_PLATFORMS}?key=${tokens.rawgToken}`)
      .then(response => response.json())
      .then(json => setPlatforms([
        { id: 0, name: 'Все' },
        ...json.results.map(({ id, name }) => ({ id, name })),
      ]));
  }, []);

  const onSorting = (sortingType, sortingValue) => {
    if (sortingType === SORTING.RATING) {
      setRatingSorted(sortingValue);
      setReleaseSorted(SORTED_TYPE.NONE);
    }
    else if (sortingType === SORTING.RELEASED) {
      setRatingSorted(SORTED_TYPE.NONE);
      setReleaseSorted(sortingValue);
    }
  };

  const onSearch = value => {
    setSearchValue(value);
  };

  return (
    <Page title='Каталог игр'>
      <SearchPanelLayout {...{
        platforms,
        platform,
        changePlatform,
        sorted: {
          [SORTING.RATING]: ratingSorted,
          [SORTING.RELEASED]: releaseSorted,
        },
        onSorting,
        onSearch,
      }} />
    </Page>
  );
};

export default MainPage;
