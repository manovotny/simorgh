import path from 'node:path';
import ms from 'ms';
import glob from 'glob';
import { getArticlePageProps } from '../../../lib/fake-bbc-api';
import ArticlePage from '#pages/ArticlePage/ArticlePage';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';

const Article = ({ pageData, mostRead }) => (
  <ArticlePage mostRead={mostRead} pageData={pageData} />
);

export const getStaticPaths = () => {
  // These are the only articles that works without an API secret.
  // https://github.com/manovotny/simorgh/tree/9fe338c4505146ff31e17e57344263cf1bb42557#local-development
  const articlePaths =
    './data/news/articles/c6v11qzyv8po.json|./data/persian/articles/c4vlle3q337o.json';

  const paths = glob
    .sync(articlePaths)
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

export default withOptimizelyProvider(Article);
