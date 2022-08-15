import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { canonicalChartbeatPropTypes } from '#models/propTypes/chartbeatAnalytics';

const chartbeatSource = '//static.chartbeat.com/js/chartbeat.js';

const CanonicalChartbeatBeacon = ({ chartbeatConfig }) => {
  const [firstLoadConfig] = useState(chartbeatConfig);

  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current && window.pSUPERFLY) {
      window.pSUPERFLY.virtualPage(chartbeatConfig);
    }
    hasMounted.current = true;
  }, [chartbeatConfig]);

  return (
    <>
      <Script id="chartbeat-config-script" async type="text/javascript">
        {`
        (function(){
          var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
          var config = ${JSON.stringify(firstLoadConfig)};
          for (var key in config) {
            _sf_async_config[key] = config[key];
          }
        })();
      `}
      </Script>
      <Script
        id="chartbeat-source-script"
        defer
        type="text/javascript"
        src={chartbeatSource}
      />
    </>
  );
};

CanonicalChartbeatBeacon.propTypes = {
  chartbeatConfig: canonicalChartbeatPropTypes.isRequired,
};

export default CanonicalChartbeatBeacon;
