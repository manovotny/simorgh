import React from 'react';
import Script from 'next/script';

const AmpComscoreAnalytics = () => (
  <amp-analytics type="comscore">
    <Script
      id="amp-comscore-anayltics-script"
      type="application/json"
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          vars: {
            c2: '17986528',
          },
          extraUrlParams: {
            comscorekw: 'amp',
          },
        }),
      }}
    />
  </amp-analytics>
);

export default AmpComscoreAnalytics;
