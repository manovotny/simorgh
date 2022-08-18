import Script from 'next/script';
import { string } from 'prop-types';

const CanonicalAdBootstrapJs = ({ adcampaign }) => {
  return (
    <Script id="canonical-ad" strategy="lazyOnload">
      {`
        window.dotcom = window.dotcom || { cmd: [] };
        window.dotcomConfig = {
          pageAds: true,
          playerAds: false
          ${adcampaign ? `, adcampaign: '${adcampaign}'` : ''}
        };
      `}
    </Script>
  );
};

CanonicalAdBootstrapJs.propTypes = {
  adcampaign: string,
};

CanonicalAdBootstrapJs.defaultProps = {
  adcampaign: null,
};

export default CanonicalAdBootstrapJs;
