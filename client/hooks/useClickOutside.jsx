import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const useClickOutside = (ref, onClick) => {
  useEffect(() => {
    const node = ref.current;

    const handler = ({ target }) => {
      if (!node) return;

      if (!node.contains(target))
        onClick();
    };

    if (node)
      document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, [ref, onClick]);
};

useClickOutside.propTypes = {
  ref: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
