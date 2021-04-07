import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeContext from 'client/context/ThemeContext';
import ChevronIcon from 'client/shared/svg/ChevronIcon.svg';

import Popup from 'components/modal/Popup';

const Container = styled.div`
  ${({ mode, theme }) => `
    display: flex;
    align-items: center;
    height: 30px;
    min-width: 50px;
    border: 2px solid ${theme[mode].defaultBorder};
    border-radius: 8px;
    cursor: pointer;
    transition: background-color ease ${theme[mode].defaultTransition};

    &:hover {
      background-color: ${theme[mode].highlightBackground};
    }
  `}
`;

const SelectedElement = styled.div`
  flex-grow: 1;
  padding: 0 10px;
`;

const CollapsedIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;

  & svg {
    transform: rotateZ(-90deg) rotateY(0deg);
    transition: transform ease ${({ mode, theme }) => theme[mode].defaultTransition};
  }

  ${Container}.collapsed & svg {
    transform: rotateZ(-90deg) rotateY(180deg);
  }
`;

const ContentContainer = styled.div`
  ${({ mode, theme }) => `
    display: flex;
    flex-direction: column;
    max-height: 290px;
    border: 2px solid ${theme[mode].defaultBorder};
    border-radius: 8px;
    font-size: 1.5rem;
    overflow-y: auto;
  `}
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  min-height: 30px;
`;

const Listbox = ({ elements, selected }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { mode } = useContext(ThemeContext);

  const hasElements = elements.length > 0;
  const element = elements[selected];

  if (!hasElements) return null;

  const ContentList = React.memo(({ elements }) => (
    <ContentContainer mode={mode}>
      {elements.map(({ id, name }) => (
        <ListItem key={`listbox-item-${id}`}>{name}</ListItem>
      ))}
    </ContentContainer>
  ));

  return (
    <Popup
      id='listbox-popup'
      content={<ContentList elements={elements} />}
    >
      <Container
        mode={mode}
        className={collapsed ? 'collapsed' : ''}
        onClick={() => setCollapsed(collapsed => !collapsed)}
      >
        <SelectedElement>
          {element?.name || ''}
        </SelectedElement>
        <CollapsedIndicator mode={mode}>
          <ChevronIcon />
        </CollapsedIndicator>
      </Container>
    </Popup>
  );
};

export default Listbox;

Listbox.propTypes = {
  selected: PropTypes.number.isRequired,
  elements: (props, propName) => {
    if (!Array.isArray(props[propName]))
      return new Error('elements must be an array');
    
    if (props[propName].filter(element => {
      if (typeof element !== 'object') return true;
      return element['id'] === undefined || element['name'] === undefined;
    }).length > 0)
      return new Error('each of elements must be object with id and name fields');

    return null;
  },
};
