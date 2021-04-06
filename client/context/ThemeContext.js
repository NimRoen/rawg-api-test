import React from 'react';

const ThemeContext = React.createContext({
  mode: 'light',
  toggle: () => {},
});

export default ThemeContext;
