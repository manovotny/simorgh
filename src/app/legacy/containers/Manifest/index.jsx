import React, { useContext } from 'react';
import Head from 'next/head';
import { ServiceContext } from '#contexts/ServiceContext';

const ManifestContainer = () => {
  const { service } = useContext(ServiceContext);

  return (
    <Head>
      <link rel="manifest" href={`/${service}/manifest.json`} />
    </Head>
  );
};

export default ManifestContainer;
