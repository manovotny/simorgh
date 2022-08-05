import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';

const cache = createCache({ key: 'next' });

const App = ({ Component, pageProps }) => (
  <CacheProvider value={cache}>
    <Component {...pageProps} />
  </CacheProvider>
);

App.propTypes = {
  Component: PropTypes.element.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]),
};

App.defaultProps = {
  pageProps: {},
};

export default App;
