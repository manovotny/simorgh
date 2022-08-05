const MomentTimezoneInclude = require('./src/app/legacy/psammead/moment-timezone-include/src');

module.exports = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  webpack: config => {
    config.plugins.push(
      new MomentTimezoneInclude({ startYear: 2010, endYear: 2025 }),
    );

    return config;
  },
};
