import React from 'react';
import { useRouter } from 'next/router';

import Page from './Page';

const GamePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Page title={slug || ''}>
    </Page>
  );
};

export default GamePage;
