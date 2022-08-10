import path from 'node:path';
import fs from 'node:fs/promises';
import ms from 'ms';
import FrontPage from '#pages/FrontPage/FrontPage';
import { filterNews } from '../lib/filter';

const News = props => {
  return <FrontPage pageData={props} />;
};

export const getServerSideProps = async ({ res, query }) => {
  const { service } = query;
  const dataPath = path.join(
    process.cwd(),
    'data',
    service,
    'frontPage',
    'index.json',
  );
  const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
  const filteredData = filterNews(data);

  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${ms('10m')}, stale-while-revalidate=${ms('5m')}`,
  );

  return {
    props: filteredData,
  };
};

export default News;
