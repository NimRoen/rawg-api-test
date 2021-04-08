import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ModalPortal from 'components/modal/ModalPortal';
import { useClickOutside } from '../../hooks/useClickOutside';

const Container = styled.div`
  ${({ position: { top, left } }) => `
    position: absolute;
    top: ${top}px;
    left: ${left}px;
  `}
`;

const Popup = ({
  id,
  content,
  hide,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
  });

  const handler = useRef(null);
  const ref = useRef(null);

  useClickOutside(ref, () => {
    setVisible(false);
    hide();
  });

  const onClick = e => {
    e.preventDefault();
    setVisible(visible => !visible);
  };

  const getPopupProps = () => ({
    ref: handler,
    onClick,
  });

  const setPopupPosition = () => {
    if (!handler.current) return undefined;

    const offset = 5;
    const handlerRect = handler.current.getBoundingClientRect();
    const { top, left, height } = handlerRect;

    return setPosition({
      top: top + height + offset,
      left: left,
    });
  };

  return (
    <>
      {typeof children === 'function' ? (
        children(getPopupProps())
      ) : (
        <div {...getPopupProps()}>{children}</div>
      )}
      {visible && content && (
        <ModalPortal key={`portal-content-${id}`} onMount={setPopupPosition}>
          <Container {...{ position, ref }}>
            {content}
          </Container>
        </ModalPortal>
      )}
    </>
  );
};

export default Popup;

Popup.propTypes = {
  id: PropTypes.string.isRequired,
  hide: PropTypes.func,
};
