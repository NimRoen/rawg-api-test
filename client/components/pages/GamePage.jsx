import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useApi } from 'client/hooks/useApi';

import Page from './Page';
import styled from 'styled-components';

const Poster = styled.div`
  position: relative;
  height: 250px;
  background: no-repeat center url('${p => p.background}');
  background-size: cover;
  box-shadow: inset 0 0 10px 10px ${p => p.theme.defaultBackground};
  opacity: 0.5;
`;

const Description = styled.div`
  margin: 30px 0;
  padding: 15px;
  border: 1px solid ${p => p.theme.actionBackground};
  border-radius: 8px;
`;

const Info = styled.p`
  & span {
    display: inline-block;
    width: 150px;
    color: ${p => p.theme.disabledColor};
  }
`;

const GamePage = () => {
  const router = useRouter();
  const [gameInfo, setGameInfo] = useState({});
  const { fetchGameInfo, fetchGameScreenshots } = useApi();

  const { name, background_image, description, released, rating, rating_top, genres } = gameInfo;

  const releasedDate = released ? new Date(released).toLocaleDateString() : '';
  const genresTotal = genres ? genres.map(({ name }) => name) : null;

  useEffect(async () => {
    const { slug } = router.query;

    if (!slug) return;

    const game = await fetchGameInfo(slug);
    const screenshots = await fetchGameScreenshots(slug);

    setGameInfo({
      ...game,
      screenshots,
    });
  }, [router.query]);

  return (
    <Page title={name || ''}>
      {background_image && <Poster background={background_image} />}
      {rating && <Info><span>Rating:</span> {rating} / {rating_top}</Info>}
      {genresTotal && <Info><span>Genres:</span> {genresTotal.join(', ')}</Info>}
      {released && <Info><span>Date of release:</span> {releasedDate}</Info>}
      <Description dangerouslySetInnerHTML={{ __html: description }} />
    </Page>
  );
};

GamePage.getInitialProps = async ({ query }) => {
  return query;
};

export default GamePage;
