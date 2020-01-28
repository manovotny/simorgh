import path from 'ramda/src/path';
import {
  buildCpsAssetPageATIParams,
  buildCpsAssetPageATIUrl,
} from '../buildParams';
import * as analyticsUtils from '#lib/analyticsUtils';
import payload from '#data/pidgin/cpsAssets/sport-23252855.json';

// Mocks
analyticsUtils.getAtUserId = jest.fn();
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');
analyticsUtils.getPublishedDatetime = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

const CONTENT_TYPE = 'article-photo-gallery';

// Fixtures
const requestContext = {
  platform: 'platform',
  isUK: 'isUK',
  statsDestination: 'statsDestination',
  previousPath: 'previousPath',
  origin: 'origin',
};

const serviceContext = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'service',
  brandName: 'Some BBC Brand',
};

const expectation = {
  appName: serviceContext.atiAnalyticsAppName,
  contentId: payload.metadata.id,
  campaigns: path(['metadata', 'passport', 'campaigns'], payload),
  contentType: 'article-photo-gallery',
  language: payload.metadata.language,
  pageIdentifier: 'sport::pidgin.sport.photo_gallery.23252855.page',
  pageTitle: `${payload.promo.headlines.headline} - ${serviceContext.brandName}`,
  categoryName: undefined,
  producerId: serviceContext.atiAnalyticsProducerId,
  statsDestination: requestContext.statsDestination,
  libraryVersion: analyticsUtils.LIBRARY_VERSION,
  platform: requestContext.platform,
  service: 'service',
  timePublished: analyticsUtils.getPublishedDatetime(),
  timeUpdated: analyticsUtils.getPublishedDatetime(),
};

describe('buildCpsAssetPageATIParams', () => {
  it('should return the right object', () => {
    const result = buildCpsAssetPageATIParams(
      payload,
      requestContext,
      serviceContext,
      CONTENT_TYPE,
    );
    expect(result).toEqual(expectation);
  });
});

describe('buildCpsAssetPageATIUrl', () => {
  it('should return the right url', () => {
    const result = buildCpsAssetPageATIUrl(
      payload,
      requestContext,
      serviceContext,
      CONTENT_TYPE,
    );

    expect(result).toEqual(
      [
        's=598285',
        `s2=${serviceContext.atiAnalyticsProducerId}`,
        `p=${expectation.pageIdentifier}`,
        'r=0x0x24x24',
        're=1024x768',
        'hl=00-00-00',
        'lng=en-US',
        `x1=[${expectation.contentId}]`,
        'x2=[responsive]',
        `x3=[${serviceContext.atiAnalyticsAppName}]`,
        `x4=[${expectation.language}]`,
        'x5=[http://localhost/]',
        `x7=[${expectation.contentType}]`,
        `x8=[${expectation.libraryVersion}]`,
        `x9=[${expectation.pageTitle.replace(/ /g, '+')}]`,
        `x11=[${expectation.timePublished}]`,
        `x12=[${expectation.timeUpdated}]`,
      ].join('&'),
    );
  });
});
