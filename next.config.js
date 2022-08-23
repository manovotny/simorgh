const { webpackDirAlias } = require('./dirAlias');
const MomentTimezoneInclude = require('./src/app/legacy/psammead/moment-timezone-include/src');

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

    config.plugins.push(
      new MomentTimezoneInclude({ startYear: 2010, endYear: 2025 }),
    );

    return config;
  },
};
