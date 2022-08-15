import React, { memo } from 'react';
import { string } from 'prop-types';
import Script from 'next/script';

const Instagram = ({ id }) => (
  <>
    <Script
      id="amp-instagram-script"
      async
      custom-element="amp-instagram"
      src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
    />
    <amp-instagram
      data-captioned
      data-shortcode={id}
      height="1"
      layout="responsive"
      width="1"
    />
  </>
);

const Twitter = ({ id }) => (
  <>
    <Script
      id="amp-twitter-script"
      async
      custom-element="amp-twitter"
      src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
    />
    <amp-twitter data-tweetid={id} height="9" layout="responsive" width="16" />
  </>
);

const YouTube = ({ id }) => (
  <>
    <Script
      id="amp-youtube-script"
      async
      custom-element="amp-youtube"
      src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
    />
    <amp-youtube data-videoid={id} height="9" layout="responsive" width="16" />
  </>
);

const sharedPropTypes = {
  id: string.isRequired,
};

Instagram.propTypes = sharedPropTypes;
Twitter.propTypes = sharedPropTypes;
YouTube.propTypes = sharedPropTypes;

export default {
  instagram: memo(Instagram),
  twitter: memo(Twitter),
  youtube: memo(YouTube),
};
