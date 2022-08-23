import path from 'node:path';
import fs from 'node:fs/promises';
import glob from 'glob';
import { ARTICLE_PAGE, FRONT_PAGE } from '#app/routes/utils/pageTypes';
import getToggles from '#lib/utilities/getToggles';
import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToGroups from '#app/routes/utils/sharedDataTransformers/addIdsToGroups';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';
import handleGroupBlocks from '#app/routes/article/handleGroupBlocks';
import handleEmptyParagraphBlocks from '#app/routes/article/handleEmptyParagraphBlocks';
import handlePromoData from '#app/routes/article/handlePromoData';
import addMpuBlock from '#app/routes/article/getInitialData/addMpuBlock';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  addIndexesToEmbeds,
  addNoCookieToEmbeds,
} from '#app/routes/utils/sharedDataTransformers';
import isListWithLink from '#app/routes/utils/isListWithLink';
import addIndexToBlockGroups from '#app/routes/utils/sharedDataTransformers/addIndexToBlockGroups';

const getLanguageAndDirection = async s => {
  const { service } = await import(`#lib/config/services/${s}`);
  const { dir, lang } = service.default;

  return {
    dir,
    lang,
  };
};

const getServices = () =>
  glob
    .sync(`./data/**/frontpage/index.json`)
    .map(result => result.split('/')[2]);

const getServicePath = service => path.join(process.cwd(), 'data', service);

const getMostRead = async service => {
  let mostRead = {};

  const servicePath = getServicePath(service);
  const mostReadPath = path.join(servicePath, 'mostRead', 'index.json');

  try {
    mostRead = JSON.parse(await fs.readFile(mostReadPath, 'utf-8'));
  } catch {}

  return mostRead;
};

const getFrontPageProps = async service => {
  const servicePath = getServicePath(service);
  const pageDataPath = path.join(servicePath, 'frontpage', 'index.json');

  let pageData = {};

  try {
    pageData = JSON.parse(await fs.readFile(pageDataPath, 'utf-8'));
    pageData = filterUnknownContentTypes(pageData);
    pageData = filterEmptyGroupItems(pageData);
    pageData = addIdsToGroups(pageData);
    pageData = squashTopStories(pageData);
    pageData = filterGroupsWithoutStraplines(pageData);
  } catch {
    return {
      pageType: FRONT_PAGE,
      service,
      statusCode: 404,
    };
  }

  const mostRead = await getMostRead(service);
  const toggles = await getToggles(service);
  const { dir, lang } = await getLanguageAndDirection(service);

  return {
    dir,
    lang,
    pageData,
    pageType: FRONT_PAGE,
    mostRead,
    service,
    statusCode: 200,
    toggles,
  };
};

const getArticlePageProps = async (service, articleId) => {
  const servicePath = getServicePath(service);
  const pageDataPath = path.join(servicePath, 'articles', `${articleId}.json`);

  let pageData = {};

  try {
    pageData = JSON.parse(await fs.readFile(pageDataPath, 'utf-8'));
    pageData = handleGroupBlocks(pageData);
    pageData = handleEmptyParagraphBlocks(pageData);
    pageData = handlePromoData(pageData);
    pageData = augmentWithTimestamp(pageData);
    pageData = addMpuBlock(pageData);
    pageData = addNoCookieToEmbeds(pageData);
    pageData = addIdsToBlocks(pageData);
    pageData = applyBlockPositioning(pageData);
    pageData = addIndexesToEmbeds(pageData);
    pageData = addIndexToBlockGroups(isListWithLink, {
      blockGroupType: 'edOjLinks',
    })(pageData);
  } catch {
    return {
      pageType: ARTICLE_PAGE,
      service,
      statusCode: 404,
    };
  }

  let secondaryColumn = {};

  try {
    const secondaryColumnPath = path.join(
      servicePath,
      'secondaryColumn',
      'index.json',
    );

    secondaryColumn = JSON.parse(
      await fs.readFile(secondaryColumnPath, 'utf-8'),
    );
  } catch {}

  const mostRead = await getMostRead(service);
  const toggles = await getToggles(service);
  const { dir, lang } = await getLanguageAndDirection(service);

  return {
    dir,
    lang,
    pageData: {
      ...pageData,
      secondaryColumn,
    },
    pageType: ARTICLE_PAGE,
    mostRead,
    service,
    statusCode: 200,
    toggles,
  };
};

export { getArticlePageProps, getFrontPageProps, getServices };
