import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useApi } from 'client/hooks/useApi';

import Carousel from 'components/UI/Carousel';

import Page from './Page';

const Poster = styled.div`
  position: relative;
  height: 600px;
  background: no-repeat center url('${p => p.background}');
  background-size: cover;
  border-radius: 16px;
  opacity: 0.5;
`;

const Description = styled.div`
  margin: 30px 0;
  padding: 15px;
  font-size: 1.6rem;
  line-height: 2.5rem;
  border: 1px solid ${p => p.theme.actionBackground};
  border-radius: 16px;
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
  const screenshots = gameInfo.screenshots?.results || [];

  const releasedDate = released ? new Date(released).toLocaleDateString() : '';
  const genresTotal = genres ? genres.map(({ name }) => name) : null;

  const showDescription = description?.length > 0;

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
      <Carousel images={screenshots} background={background_image || ''} />
      {rating && <Info><span>Rating:</span> {rating} / {rating_top}</Info>}
      {genresTotal && <Info><span>Genres:</span> {genresTotal.join(', ')}</Info>}
      {released && <Info><span>Date of release:</span> {releasedDate}</Info>}
      {showDescription && <Description dangerouslySetInnerHTML={{ __html: description }} />}
    </Page>
  );
};

export default GamePage;
