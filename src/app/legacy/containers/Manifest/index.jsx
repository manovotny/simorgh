import React, { useContext } from 'react';
import Head from 'next/head';
import { ServiceContext } from '#contexts/ServiceContext';

const ManifestContainer = () => {
  const { manifestPath, service } = useContext(ServiceContext);

  if (!manifestPath) {
    return null;
  }

  return (
    <Head>
      <link rel="manifest" href={`/public/${service}${manifestPath}`} />
    </Head>
  );
};

export default ManifestContainer;
