import { SWRConfig } from 'swr';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import PageWrapper from '#app/Layouts/defaultPageWrapper';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import getToggles from '#lib/config/toggles';
import { RequestContextProvider } from '#contexts/RequestContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { UserContextProvider } from '#contexts/UserContext';

const cache = createCache({ key: 'next' });

const App = ({ Component, pageProps, router }) => {
  const { asPath, query } = router;
  const { service } = query;
  const { pageData } = pageProps;
  const language = pageData?.metadata?.language || 'en-gb';
  const status = 200;
  const pageType = 'frontPage';

  // Purposely not using `getToggles` from `#lib/utilities/getToggles`
  // because it does a bunch of async logging, which means we'd need to use
  // `useEffect` or `getInitialProps` and that would disable SSR. The benefit
  // is not *that* important to warrant turning that off.
  //
  // import getToggles from '#lib/utilities/getToggles';
  // const toggles = await getToggles(service);

  const environment = process.env.SIMORGH_APP_ENV || 'local';
  const toggles = getToggles[environment];

  return (
    <CacheProvider value={cache}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then(res => res.json()),
        }}
      >
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta
            name="robots"
            content="noodp, noydir, max-image-preview:large"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <ToggleContextProvider toggles={toggles}>
          <ServiceContextProvider service={service} pageLang={language}>
            <RequestContextProvider
              pageType={pageType}
              service={service}
              statusCode={status}
              pathname={asPath}
            >
              <EventTrackingContextProvider pageData={pageProps}>
                <UserContextProvider>
                  <PageWrapper pageData={pageData} status={status}>
                    <Component {...pageProps} />
                  </PageWrapper>
                </UserContextProvider>
              </EventTrackingContextProvider>
            </RequestContextProvider>
          </ServiceContextProvider>
        </ToggleContextProvider>
      </SWRConfig>
    </CacheProvider>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]),
};

App.defaultProps = {
  pageProps: {},
};

export default App;
