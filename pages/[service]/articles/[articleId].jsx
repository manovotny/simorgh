import path from 'node:path';
import fs from 'node:fs/promises';
import ms from 'ms';
import glob from 'glob';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
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
import ArticlePage from '#pages/ArticlePage/ArticlePage';

const Article = ({ pageData, mostRead }) => (
  <ArticlePage mostRead={mostRead} pageData={pageData} />
);

export const getStaticPaths = () => {
  const paths = glob
    .sync('./data/news/articles/c6v11qzyv8po.json')
    .map(result => `/news/articles/${path.parse(result).name}`);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
  const { articleId, service } = params;
  const servicePath = path.join(process.cwd(), 'data', service);

  const pageDataPath = path.join(servicePath, 'articles', `${articleId}.json`);
  let pageData = JSON.parse(await fs.readFile(pageDataPath, 'utf-8'));

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

  let mostRead = {};
  const mostReadPath = path.join(servicePath, 'mostRead', 'index.json');
  try {
    mostRead = JSON.parse(await fs.readFile(mostReadPath, 'utf-8'));
  } catch {}

  let secondaryColumn = {};
  const secondaryColumnPath = path.join(
    servicePath,
    'secondaryColumn',
    'index.json',
  );
  try {
    secondaryColumn = JSON.parse(
      await fs.readFile(secondaryColumnPath, 'utf-8'),
    );
  } catch {}

  return {
    props: {
      pageData: {
        ...pageData,
        secondaryColumn,
      },
      pageType: ARTICLE_PAGE,
      mostRead,
    },
    revalidate: ms('1h'),
  };
};

export default Article;
