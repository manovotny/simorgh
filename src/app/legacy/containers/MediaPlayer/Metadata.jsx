import React from 'react';
import Script from 'next/script';
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
    <>
      {metadata && (
        <Script id="media-player-metadata-script" type="application/ld+json">
          {JSON.stringify(metadata)}
        </Script>
      )}
    </>
  );
};

Metadata.propTypes = {
  aresMediaBlock: shape({
    model: shape({}).isRequired,
  }).isRequired,
  embedSource: string.isRequired,
};

export default Metadata;
