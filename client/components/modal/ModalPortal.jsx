import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const ModalPortal = ({ onMount = () => {}, children }) => {
  const [node] = useState(typeof document !== 'undefined' ? document.createElement('div') : undefined);

  useEffect(() => {
    if (node) {
      document.body.appendChild(node);
      onMount();
    }

    return () => {
      if (node) document.body.removeChild(node);
    };
  }, []);

  if (!node) return null;

  return ReactDOM.createPortal(children, node);
};

export default ModalPortal;

ModalPortal.propTypes = {
  onMount: PropTypes.func,
};
