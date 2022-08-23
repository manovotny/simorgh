/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from 'react';
import Script from 'next/script';
import { UserContext } from '#contexts/UserContext';

const CanonicalComscoreAnalytics = () => {
  const { personalisationEnabled } = useContext(UserContext);

  useEffect(() => {
    const csUcfr = personalisationEnabled ? '1' : '';
    /* eslint-disable no-underscore-dangle */
    window._comscore = window._comscore || [];
    window._comscore.push({ c1: '2', c2: '17986528', cs_ucfr: csUcfr });
  }, [personalisationEnabled]);

  return (
    <>
      <Script
        id="comscore-script"
        async
        type="text/javascript"
        src={'/static/js/comscore/main-1.0.js'}
      />
      <noscript>
        {`<img src="https://sb.scorecardresearch.com/p?c1=2&c2=17986528&cv=2.0&cj=1" />`}
      </noscript>
    </>
  );
};

export default CanonicalComscoreAnalytics;
