import path from 'ramda/src/path';
import assocPath from 'ramda/src/assocPath';
import loggerMock from '#testHelpers/loggerMock';
import { EPISODE_EXPIRED } from '#lib/logger.const';
import getEpisodeAvailability, { getUrl } from '.';
import onDemandRadioEpisodeJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1';
import onDemandRadioBrandJson from '#data/indonesia/bbc_indonesian_radio/w13xtt0s';
import onDemandTvEpisodeJson from '#data/afrique/bbc_afrique_tv/w13xttmz.json';
import onDemandTvBrandJson from '#data/somali/bbc_somali_tv/tv_programmes/w13xttqt.json';

describe('Logging episodeAvailability', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a valid url for radio episode page', () => {
    const url = getUrl(onDemandRadioEpisodeJson);

    const service = path(
      ['relatedContent', 'site', 'name'],
      onDemandRadioEpisodeJson,
    ).toLowerCase();
    const masterBrand = path(
      ['metadata', 'createdBy'],
      onDemandRadioEpisodeJson,
    );
    const pid = path(['promo', 'locators', 'pid'], onDemandRadioEpisodeJson);

    expect(url).toEqual(`${service}/${masterBrand}/${pid}`);
  });

  it('should return a valid url for radio brand page', () => {
    const url = getUrl(onDemandRadioBrandJson);

    const service = path(
      ['relatedContent', 'site', 'name'],
      onDemandRadioBrandJson,
    ).toLowerCase();
    const masterBrand = path(['metadata', 'createdBy'], onDemandRadioBrandJson);
    const pid = path(['promo', 'locators', 'brandPid'], onDemandRadioBrandJson);

    expect(url).toEqual(`${service}/${masterBrand}/programmes/${pid}`);
  });

  //   add tests for tv URLs

  it('logs the correct message when the on demand radio episode is expired', async () => {
    const dataWithoutVersions = assocPath(
      ['content', 'blocks', 0, 'versions'],
      [],
      onDemandRadioEpisodeJson,
    );
    const episodeAvailability = getEpisodeAvailability(dataWithoutVersions);
    expect(episodeAvailability).toEqual('expired');
    expect(loggerMock.info).toHaveBeenCalledWith(EPISODE_EXPIRED, {
      url: 'pashto/bbc_pashto_radio/w3ct0lz1',
    });
  });

  it('does not log anything when a radio episode is available', async () => {
    const oneMinuteAgo = Date.now() - 60 * 1000;
    const responseWithEpisodeAvailableOneMinuteAgo = assocPath(
      ['content', 'blocks', '0', 'versions', '0', 'availableFrom'],
      oneMinuteAgo,
      onDemandRadioEpisodeJson,
    );
    fetch.mockResponse(
      JSON.stringify(responseWithEpisodeAvailableOneMinuteAgo),
    );

    expect(loggerMock.info).not.toHaveBeenCalled();
  });
});
