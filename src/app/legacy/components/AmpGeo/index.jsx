import React from 'react';
import Script from 'next/script';

const configuration = {
  AmpBind: true,
  ISOCountryGroups: {
    eea: [
      'at',
      'ax',
      'be',
      'bg',
      'bl',
      'cy',
      'cz',
      'de',
      'dk',
      'ea',
      'ee',
      'es',
      'fi',
      'fr',
      'gb',
      'gf',
      'gg',
      'gi',
      'gp',
      'gr',
      'hr',
      'hu',
      'ic',
      'ie',
      'im',
      'is',
      'it',
      'je',
      'li',
      'lt',
      'lu',
      'lv',
      'mf',
      'mq',
      'mt',
      'nc',
      'nl',
      'no',
      'pf',
      'pl',
      'pm',
      'pt',
      're',
      'ro',
      'se',
      'si',
      'sj',
      'sk',
      'tf',
      'va',
      'wf',
      'yt',
    ],
    gbOrUnknown: ['gb', 'gg', 'im', 'je', 'uk', 'unknown'],
  },
};

export const AMP_GEO_SCRIPT = (
  <Script
    id="amp-geo-script"
    async
    custom-element="amp-geo"
    src="https://cdn.ampproject.org/v0/amp-geo-0.1.js"
  />
);

const AmpGeo = () => (
  <amp-geo layout="nodisplay">
    <Script
      id="amp-geo-nodisplay-script"
      type="application/json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(configuration) }}
    />
  </amp-geo>
);

export default AmpGeo;
