const { webpackDirAlias } = require('./dirAlias');

module.exports = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.resolve.alias = {
      ...webpackDirAlias,
      ...config.resolve.alias,
    };

    return config;
  },
};
