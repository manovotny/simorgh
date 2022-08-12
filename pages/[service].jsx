import path from 'node:path';
import fs from 'node:fs/promises';
import ms from 'ms';
import glob from 'glob';
import FrontPage from '#pages/FrontPage/FrontPage';

import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToGroups from '#app/routes/utils/sharedDataTransformers/addIdsToGroups';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';

const News = props => {
  return <FrontPage pageData={props} />;
};

export const getStaticPaths = () => {
  const paths = glob
    .sync(`./data/**/frontpage/index.json`)
    .map(result => `/${result.split('/')[2]}`);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
  const { service } = params;
  const dataPath = path.join(
    process.cwd(),
    'data',
    service,
    'frontpage',
    'index.json',
  );
  let data = JSON.parse(await fs.readFile(dataPath, 'utf-8'));

  data = filterUnknownContentTypes(data);
  data = filterEmptyGroupItems(data);
  data = addIdsToGroups(data);
  data = squashTopStories(data);
  data = filterGroupsWithoutStraplines(data);

  return {
    props: data,
    revalidate: ms('5m'),
  };
};

export default News;
