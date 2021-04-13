import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { routes } from 'helpers/routes';

const Container = styled.aside`
  min-width: 300px;
  max-width: 300px;
  padding: 30px 0;
`;

const Menu = styled.ul`
  font-weight: 700;
  text-transform: uppercase;
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

  useEffect(() => {
    setLinks(Object.keys(routes).reduce((acc, key) => (
      !!routes[key].name ? [...acc, routes[key]] : acc
    ), []));
  }, []);

  return (
    <Container>
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
    </Container>
  );
};

export default SidePanelLayout;
