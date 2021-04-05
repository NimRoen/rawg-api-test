import React from 'react';
import { useRouter } from 'next/router';

const GamePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      {slug}
    </>
  );
};

export default GamePage;
