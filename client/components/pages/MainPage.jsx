import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { API_PLATFORMS } from 'helpers/constants';
import SearchPanelLayout from 'layouts/SearchPanelLayout';

import Page from './Page';

import tokens from 'root/tokens.json';

const MainPage = () => {
  const [platforms, setPlatforms] = useState([]);
  const [platform, changePlatform] = useState(0);

  useEffect(() => {
    fetch(`${API_PLATFORMS}?key=${tokens.rawgToken}`)
      .then(response => response.json())
      .then(json => setPlatforms([
        { id: 0, name: 'Все' },
        ...json.results.map(({ id, name }) => ({ id, name })),
      ]));
  }, []);

  return (
    <Page title='Каталог игр'>
      <SearchPanelLayout {...{ platforms, platform, changePlatform }} />
    </Page>
  );
};

export default MainPage;
