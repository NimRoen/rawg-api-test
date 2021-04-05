import Head from 'next/head';

const DigitalPineTest = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Digital Pine - vacancy initial test</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default DigitalPineTest;
