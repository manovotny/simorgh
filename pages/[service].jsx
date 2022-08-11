import path from 'node:path';
import fs from 'node:fs/promises';
import ms from 'ms';
import glob from 'glob';
import FrontPage from '#pages/FrontPage/FrontPage';
import { filterNews } from '../lib/filter';

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
  const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
  const filteredData = filterNews(data);

  return {
    props: filteredData,
    revalidate: ms('5m'),
  };
};

export default News;
