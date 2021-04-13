import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 350px;
    color: ${theme.actionForeground};
    background-color: ${theme.actionBackground};
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow ease ${theme.defaultTransition};
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);

    &:hover {
      box-shadow: 0 0 20px 5px ${theme.actionBackground}80;
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

  const releasedDate = released ? new Date(released).toLocaleDateString() : '';

  return (
    <Container>
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
