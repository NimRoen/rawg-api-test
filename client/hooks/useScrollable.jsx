import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import throttle from 'lodash/throttle';

const DEFAULT_THROTTLE = 400;
const DEFAULT_OFFSET = 20;

const getScrollTop = node => (node ? node.scrollTop : 0);

const useRefScrollTop = (node, options) => {
  const [position, setScrollTop] = useState(getScrollTop(node.current));

  useEffect(() => {
    const scrollable = node.current;
    if (!scrollable) return undefined;

    const handleScroll = throttle(() => {
      setScrollTop(getScrollTop(scrollable));
    }, options?.throttle || DEFAULT_THROTTLE);

    scrollable.addEventListener('scroll', handleScroll);

    return () => scrollable?.removeEventListener('scroll', handleScroll);
  }, [node, options?.throttle]);

  return position;
};

const isAtTheBottom = (node, offset) => {
  if (node) {
    const { scrollHeight, offsetHeight, scrollTop } = node;

    if (scrollHeight === offsetHeight) return true;

    return scrollHeight - offsetHeight - scrollTop <= offset;
  }

  return false;
};

const isAtTheTop = (scrollTop, offset) => scrollTop <= offset;

export const useScrollable = options => {
  const container = useRef(null);
  const scrollTop = useRefScrollTop(container, options);
  const atTheTop = isAtTheTop(scrollTop, options?.offset.top || DEFAULT_OFFSET);
  const atTheBottom = isAtTheBottom(container.current, options?.offset.bottom || DEFAULT_OFFSET);

  return {
    scrollTop,
    ref: container,
    scrollable: container.current,
    atTheTop,
    atTheBottom,
  }
};

useScrollable.propTypes = {
  options: {
    offset: {
      top: PropTypes.number,
      bottom: PropTypes.number,
    },
    throttle: PropTypes.number,
  },
};
