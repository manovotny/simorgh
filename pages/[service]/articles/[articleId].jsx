import path from 'node:path';
import ms from 'ms';
import glob from 'glob';
import { getArticlePageProps } from '../../../lib/fake-bbc-api';
import ArticlePage from '#pages/ArticlePage/ArticlePage';

const Article = ({ pageData, mostRead }) => (
  <ArticlePage mostRead={mostRead} pageData={pageData} />
);

export const getStaticPaths = () => {
  // This is the only article that works without an API secret.
  const articlePath = './data/news/articles/c6v11qzyv8po.json';

  const paths = glob
    .sync(articlePath)
    .map(result => `/news/articles/${path.parse(result).name}`);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
  const { articleId, service } = params;
  const props = await getArticlePageProps(service, articleId);

  return {
    props,
    revalidate: ms('1h'),
  };
};

export default Article;
