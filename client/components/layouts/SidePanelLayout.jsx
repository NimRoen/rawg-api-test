import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { routes } from 'helpers/routes';
import { mediaSelector } from '../../helpers/style';

const Container = styled.aside`
  position: relative;
  min-width: 300px;
  max-width: 300px;
  padding: 30px 0;
  background-color: ${p => p.theme.defaultBackground};

  ${mediaSelector.tablet} {
    position: fixed;
    top: 0;
    left: -250px;
    bottom: 0;
    box-shadow: 0 0 20px 5px rgba(0,0,0,0.2);
    z-index: 1;
    transition: left ease ${p => p.theme.defaultTransition};

    &.expanded {
      left: 0;
    }
  }
`;

const Menu = styled.ul`
  font-weight: 700;
  text-transform: uppercase;
`;

const Burger = styled.div`
  ${({ theme }) => `
    position: absolute;
    width: 20px;
    height: 3px;
    top: 23px;
    right: 15px;
    background-color: ${theme.defaultColor};

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 3px;
      background-color: ${theme.defaultColor};
    }
    
    &::before {
      top: -6px;
    }
    
    &::after {
      bottom: -6px;
    }
  `}
`;

const Option = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;

  & a {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 30px;
  }

  &.selected {
    padding: 0 30px;
  }
`;

const SidePanelLayout = () => {
  const router = useRouter();
  const [links, setLinks] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setLinks(Object.keys(routes).reduce((acc, key) => (
      !!routes[key].name ? [...acc, routes[key]] : acc
    ), []));
  }, []);

  const toggle = () => setExpanded(expanded => !expanded);

  return (
    <Container className={expanded ? 'expanded' : ''}>
      <Menu>
        {links.map((link, index) => {
          const isCurrentPath = router.asPath === link.path;

          return isCurrentPath ? (
            <Option key={`side-panel-menu-option-${index}`} className='selected'>
              {link.name}
            </Option>
          ) : (
            <Option key={`side-panel-menu-option-${index}`}>
              <Link href={link.path}>{link.name}</Link>
            </Option>
          );
        })}
      </Menu>
      <Burger onClick={toggle}/>
    </Container>
  );
};

export default SidePanelLayout;
