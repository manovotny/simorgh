import React from 'react';
import Head from 'next/head';
import pathOr from 'ramda/src/pathOr';
import { shape, string } from 'prop-types';
import { mediaPlayerMetadata } from './helpers/metadata';

const Metadata = ({ aresMediaBlock, embedSource }) => {
  const aresMediaBlocks = pathOr(null, ['model', 'blocks'], aresMediaBlock);

  if (!aresMediaBlocks || aresMediaBlocks.length < 1) {
    return null;
  }

  const metadata = mediaPlayerMetadata(aresMediaBlocks, embedSource);

  return (
    <Head>
      {metadata && (
        <script type="application/ld+json">{JSON.stringify(metadata)}</script>
      )}
    </Head>
  );
};

Metadata.propTypes = {
  aresMediaBlock: shape({
    model: shape({}).isRequired,
  }).isRequired,
  embedSource: string.isRequired,
};

export default Metadata;
