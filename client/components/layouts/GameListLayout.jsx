import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { scrollbar } from 'helpers/style';

import ThemeContext from 'client/context/ThemeContext';

import GameCardLayout from './GameCardLayout';

const Container = styled.div`
  ${({ mode }) => `
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
    padding: 15px 0;
    flex-grow: 1;

    ${scrollbar(mode)}
  `}
`;

const Anchor = styled(({ anchor, children, ...props }) => (
  <div {...props}>
    <div ref={anchor}>{children}</div>
  </div>
))`
  position: relative;
  height: 0;

  & div {
    content: '';
    position: absolute;
    top: -222px;
    width: 100%;
    height: 302px;
    margin: 0 auto;
  }
`;

const GameListLayout = ({ games, anchor }) => {
  const { mode } = useContext(ThemeContext);
  const { prev, next } = games;

  useEffect(() => {
    document.body.ref
  }, []);

  return (
    <>
      <Container mode={mode}>
        {prev.map(game => <GameCardLayout key={`game-card-${game.id}`} game={game} />)}
      </Container>
      <Anchor anchor={anchor} />
      <Container mode={mode}>
        {next.map(game => <GameCardLayout key={`game-card-${game.id}`} game={game} />)}
      </Container>
    </>
  );
};

export default GameListLayout;

GameListLayout.propTypes = {
  games: (props, propName) => {
    if (typeof props[propName] !== 'object')
      return new Error('games must be an object with two arrays - prev and next games');
    
    if (!Array.isArray(props[propName].prev) || !Array.isArray(props[propName].next))
      return new Error('games must be contains two games arrays - prev and next');

    return null;
  },
};
