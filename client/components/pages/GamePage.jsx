import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useApi } from 'client/hooks/useApi';

import Page from './Page';

const GamePage = () => {
  const [gameInfo, setGameInfo] = useState({});
  const { fetchGame, fetchGameScreenshots } = useApi();
  const router = useRouter();

  const { slug } = router.query;

  console.log(gameInfo);

  useEffect(async () => {
    const game = await fetchGame(slug);
    const screenshots = await fetchGameScreenshots(slug);

    setGameInfo({
      ...game,
      screenshots,
    });
  }, []);

  return (
    <Page title={slug || ''}>
    </Page>
  );
};

export default GamePage;
