import React from 'react';
import { string } from 'prop-types';
import getAmpAnalyticsJson from './ampAnalyticsJson';
import Script from 'next/script';

const JsonInlinedScript = data => (
  <Script id="amp-analytics" strategy="lazyOnload" type="application/json">
    {JSON.stringify(data)}
  </Script>
);

const AmpATIAnalytics = ({ pageviewParams }) => {
  return (
    <amp-analytics>
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          baseUrl: process.env.NEXT_PUBLIC_SIMORGH_ATI_BASE_URL,
          pageviewParams,
        }),
      )}
    </amp-analytics>
  );
};

AmpATIAnalytics.propTypes = {
  pageviewParams: string.isRequired,
};

export default AmpATIAnalytics;
