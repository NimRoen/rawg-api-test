import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import throttle from 'lodash/throttle';

import { SORTED_TYPE, SORTING } from 'helpers/constants';

import ThemeContext from 'client/context/ThemeContext';
import Star from 'client/shared/svg/StarIcon.svg';
import Calendar from 'client/shared/svg/CalendarIcon.svg';

import Listbox from 'components/UI/Listbox';
import StyledButton from 'components/UI/Button';
import Textfield from 'components/UI/Textfield';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const SortersContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  margin-right: 6px;
`;

const Button = styled(StyledButton)`
  ${({ mode, theme }) => `
    position: relative;
    margin-right: 10px;

    &:before {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      top: -6px;
      right: -6px;
      background-color: ${theme[mode].actionBackground};
      border-radius: 50%;
      opacity: 1;
      transition: opacity ease ${theme[mode].defaultTransition};
    }

    &:after {
      content: '';
      position: absolute;
      top: 2px;
      right: 2px;
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 6px solid ${theme[mode].actionForeground};
      opacity: 1;
      transition: transform ease ${theme[mode].defaultTransition},
                  opacity ease ${theme[mode].defaultTransition};
    }

    &.descending:after {
      transform: translateX(4px)
                 translateY(-2px)
                 rotateZ(0deg);
    }

    &.ascending:after {
      transform: translateX(4px)
                 translateY(-4px)
                 rotateZ(180deg);
    }

    &.none:before, &.none:after {
      opacity: 0;
    }
  `}
`;

const StarIcon = styled(Star)`
  width: 20px;
  height: 20px;
  margin-bottom: 2px;
`;

const CalendarIcon = styled(Calendar)`
  width: 20px;
  height: 20px;
  margin-bottom: 2px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const SearchField = styled(Textfield)`
  width: 300px;
  padding-left: 6px;
  padding-right: 36px;
`;

const SearchPanelLayout = ({
  platforms,
  platform,
  changePlatform,
  sorted,
  onSorting,
  onSearchInput,
  onSearch,
}) => {
  const { mode } = useContext(ThemeContext);
  const selected = platforms.reduce((acc, { id }, index) => id === platform ? index : acc, 0);

  const toggleSorting = (sortingType) => {
    const sortingValue =
      sorted[sortingType] === SORTED_TYPE.DESCENDING ? SORTED_TYPE.ASCENDING : SORTED_TYPE.DESCENDING;

    onSorting(sortingType, sortingValue);
  };

  return (
    <Container>
      <FiltersContainer>
        <Label>{'Платформа:'}</Label>
        <Listbox
          elements={platforms}
          selected={selected}
          onSelect={changePlatform}
        />
      </FiltersContainer>
      <SortersContainer>
        <Button
          icon={<StarIcon />}
          onClick={() => toggleSorting(SORTING.RATING)}
          mode={mode}
          className={sorted[SORTING.RATING]}
        />
        <Button
          icon={<CalendarIcon />}
          onClick={() => toggleSorting(SORTING.RELEASED)}
          mode={mode}
          className={sorted[SORTING.RELEASED]}
        />
      </SortersContainer>
      <SearchContainer>
        <form onSubmit={e => {
          e.preventDefault();
          onSearch();
        }}>
          <SearchField
            placeholder='Поиск...'
            onChange={throttle(e => {
              e.preventDefault();
              onSearchInput(e.target.value);
            }, 200)}
          />
        </form>
      </SearchContainer>
    </Container>
  );
};

export default SearchPanelLayout;

SearchPanelLayout.propTypes = {
  platforms: PropTypes.array.isRequired,
  platform: PropTypes.number,
  changePlatform: PropTypes.func,
  sorted: PropTypes.object.isRequired,
  onSorting: PropTypes.func,
  onSearchInput: PropTypes.func,
  onSearch: PropTypes.func,
};
