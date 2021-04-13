import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { scrollbar } from 'helpers/style';

import ChevronIcon from 'client/shared/svg/ChevronIcon.svg';

import Popup from 'components/modal/Popup';

const Container = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    height: 30px;
    min-width: 50px;
    border: 2px solid ${theme.defaultBorder};
    border-radius: 8px;
    cursor: pointer;
    transition: background-color ease ${theme.defaultTransition};

    &:hover {
      background-color: ${theme.highlightBackground};
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
    transform: rotateZ(-90deg) rotateY(180deg);
    transition: transform ease ${({ theme }) => theme.defaultTransition};
  }

  ${Container}.collapsed & svg {
    transform: rotateZ(-90deg) rotateY(0deg);
  }
`;

const ContentWrapper = styled.div`
  ${({ theme }) => `
    padding-right: 3px;
    border: 2px solid ${theme.defaultBorder};
    border-radius: 8px;
    font-size: 1.5rem;
    background-color: ${theme.defaultBackground};
    overflow: hidden;
  `}
`;

const ContentContainer = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    max-height: 290px;
    overflow-y: auto;

    ${scrollbar(theme)}
  `}
`;

const ListItem = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    padding: 0 10px;
    min-height: 30px;
    cursor: pointer;

    &:hover {
      background-color: ${theme.highlightBackground};
    }

    &.selected {
      color: ${theme.highlightColor};
      cursor: default;
    }
  `}
`;

const Listbox = ({ elements, selected, onSelect }) => {
  const [collapsed, setCollapsed] = useState(true);

  const hasElements = elements.length > 0;
  const element = elements[selected];

  if (!hasElements) return null;

  const hide = () => setCollapsed(true);

  const ContentList = React.memo(({ elements }) => (
    <ContentWrapper>
      <ContentContainer>
        {elements.map(({ id, name }, index) => (
          <ListItem
            key={`listbox-item-${id}`}
            onClick={() => {
              if (selected !== index) {
                onSelect(id);
                hide();
              }
            }}
            className={selected === index ? 'selected' : ''}
          >{name}</ListItem>
        ))}
      </ContentContainer>
    </ContentWrapper>
  ));

  return (
    <Popup
      id='listbox-popup'
      content={<ContentList elements={elements} />}
      hide={hide}
    >
      <Container
        className={collapsed ? 'collapsed' : ''}
        onClick={() => setCollapsed(collapsed => !collapsed)}
      >
        <SelectedElement>
          {element?.name || ''}
        </SelectedElement>
        <CollapsedIndicator>
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
  onSelect: PropTypes.func,
};
