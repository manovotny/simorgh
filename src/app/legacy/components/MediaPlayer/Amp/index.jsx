import React from 'react';
import { string } from 'prop-types';
import Script from 'next/script';
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
import Message from '../Message';

const AmpHead = () => (
  <Script
    id="amp-iframe-script"
    async
    custom-element="amp-iframe"
    src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
  />
);

const AmpMediaPlayer = ({
  src,
  placeholderSrc,
  placeholderSrcset,
  title,
  noJsMessage,
  service,
}) => {
  return (
    <>
      <AmpHead />
      <amp-iframe
        sandbox="allow-scripts allow-same-origin"
        layout="fill"
        scrolling="no"
        frameborder="0"
        src={src}
        title={title}
        allowfullscreen="allowfullscreen"
        data-e2e="media-player"
      >
        <ImagePlaceholder ratio={56.25} placeholder="" />
        <noscript>
          <Message
            service={service}
            message={noJsMessage}
            placeholderSrc={placeholderSrc}
            placeholderSrcset={placeholderSrcset}
          />
        </noscript>
      </amp-iframe>
    </>
  );
};

AmpMediaPlayer.propTypes = {
  src: string.isRequired,
  placeholderSrc: string.isRequired,
  placeholderSrcset: string,
  title: string.isRequired,
  noJsMessage: string.isRequired,
  service: string.isRequired,
};
AmpMediaPlayer.defaultProps = {
  placeholderSrcset: null,
};

export default AmpMediaPlayer;
