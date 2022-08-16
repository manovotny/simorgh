import path from 'node:path';
import fs from 'node:fs/promises';
import ms from 'ms';
import glob from 'glob';
import FrontPage from '#pages/FrontPage/FrontPage';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import getToggles from '#lib/utilities/getToggles';

import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToGroups from '#app/routes/utils/sharedDataTransformers/addIdsToGroups';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';

const News = ({ pageData, mostRead }) => {
  return <FrontPage mostRead={mostRead} pageData={pageData} />;
};

export const getStaticPaths = () => {
  const paths = glob
    .sync(`./data/**/frontpage/index.json`)
    .map(result => `/${result.split('/')[2]}`);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
  const { service } = params;
  const servicePath = path.join(process.cwd(), 'data', service);

  const pageDataPath = path.join(servicePath, 'frontpage', 'index.json');
  let pageData = JSON.parse(await fs.readFile(pageDataPath, 'utf-8'));

  pageData = filterUnknownContentTypes(pageData);
  pageData = filterEmptyGroupItems(pageData);
  pageData = addIdsToGroups(pageData);
  pageData = squashTopStories(pageData);
  pageData = filterGroupsWithoutStraplines(pageData);

  let mostRead = {};
  const mostReadPath = path.join(servicePath, 'mostRead', 'index.json');
  try {
    mostRead = JSON.parse(await fs.readFile(mostReadPath, 'utf-8'));
  } catch {}

  const toggles = await getToggles(service);

  return {
    props: {
      pageData,
      pageType: FRONT_PAGE,
      mostRead,
      toggles,
    },
    revalidate: ms('5m'),
  };
};

export default News;
