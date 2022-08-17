import { SWRConfig } from 'swr';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import PageWrapper from '#app/Layouts/defaultPageWrapper';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { UserContextProvider } from '#contexts/UserContext';
import Error from 'next/error';

const cache = createCache({ key: 'next' });

const App = ({ Component, pageProps, router }) => {
  const { asPath } = router;
  const { pageData, pageType, toggles, service, statusCode } = pageProps;
  const language = pageData?.metadata?.language || 'en-gb';

  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

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
              statusCode={statusCode}
              pathname={asPath}
            >
              <EventTrackingContextProvider pageData={pageProps}>
                <UserContextProvider>
                  <PageWrapper pageData={pageData} status={statusCode}>
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
