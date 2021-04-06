import { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import ThemeContext from 'client/context/ThemeContext';
import { theme } from 'styles/theme';

import 'styles/styles.css';

const DigitalPineTest = ({ Component, pageProps }) => {
  const [mode, setTheme] = useState('dark');
  const value = {
    mode,
    toggle: () => setTheme(mode => mode === 'dark' ? 'light' : 'dark'),
  };

  return (
    <>
      <Head>
        <title>Digital Pine - vacancy initial test</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html {
                font-family: ${theme[mode].defaultText};
              }

              body {
                color: ${theme[mode].defaultColor};
                background-color: ${theme[mode].defaultBackground};
                transition: all ease ${theme[mode].defaultTransition};
              }

              h1, h2, h3, h4, h5, h6 {
                font-family: ${theme[mode].defaultTitle};
              }

              li a {
                color: ${theme[mode].defaultColor};
              }

              li:hover a {
                color: ${theme[mode].defaultColor};
              }

              li:hover {
                background-color: ${theme[mode].highlightBackground};
              }

              li.selected {
                color: ${theme[mode].actionColor};
              }

              li.selected:hover {
                background-color: unset;
              }
            `
          }}
        />
      </Head>
      <ThemeProvider theme={theme}>
        <ThemeContext.Provider value={value}>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default DigitalPineTest;
