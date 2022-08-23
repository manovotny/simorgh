import Cache from 'lru-cache';
import getToggles from '.';

const cacheMaxItems = parseInt(
  process.env.NEXT_PUBLIC_SIMORGH_CONFIG_CACHE_ITEMS,
  10,
);
const cacheMaxAge = parseInt(
  process.env.NEXT_PUBLIC_SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS,
  10,
);
const cache = new Cache({ max: cacheMaxItems, maxAge: cacheMaxAge * 1000 });

const withCache = async service => getToggles(service, cache);

export default withCache;
