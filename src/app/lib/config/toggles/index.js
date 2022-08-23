import local from './localConfig';
import test from './testConfig';
import live from './liveConfig';

export default {
  development: local,
  preview: test,
  production: live,
};
