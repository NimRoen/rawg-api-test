import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeContext from 'client/context/ThemeContext';

const Container = styled.div`
  ${({ mode, theme }) => `
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 350px;
    background-color: ${theme[mode].actionBackground};
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: background-color ease ${theme[mode].defaultTransition};

    &:hover {
      box-shadow: 0 0 20px 5px ${theme[mode].actionBackground}80;
    }
  `}
`;

const PosterContainer = styled.div`
  height: 250px;
`;

const Poster = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 15px 15px 15px;
`;

const TitleContainer = styled.div`
  flex-grow: 1;
`;

const Title = styled.h4``;

const AdditionalInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReleasedDateContainer = styled.div``;

const RatingContainer = styled.div``;

const GameCardLayout = ({ game }) => {
  const { name, background_image, released, rating } = game;
  const { mode } = useContext(ThemeContext);

  const releasedDate = released ? new Date(released).toLocaleDateString() : '';

  return (
    <Container mode={mode}>
      <PosterContainer>
        {background_image && <Poster src={background_image} alt={name} />}
      </PosterContainer>
      <InfoContainer>
        <TitleContainer>
          <Title>{name}</Title>
        </TitleContainer>

        <AdditionalInfoContainer>
          <ReleasedDateContainer>
            {releasedDate}
          </ReleasedDateContainer>

          <RatingContainer>
            {`★ ${rating}`}
          </RatingContainer>
        </AdditionalInfoContainer>
      </InfoContainer>
    </Container>
  );
};

export default GameCardLayout;

GameCardLayout.propTypes = {
  game: PropTypes.object,
};
