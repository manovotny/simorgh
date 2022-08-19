import path from 'node:path';
import ms from 'ms';
import glob from 'glob';
import { getArticlePageProps } from '../../../lib/fake-bbc-api';
import ArticlePage from '#pages/ArticlePage/ArticlePage';
import getOptimizelyUserId from '#containers/PageHandlers/withOptimizelyProvider/getOptimizelyUserId';
import { createInstance, OptimizelyProvider } from '@optimizely/react-sdk';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';

const optimizely = createInstance({
  sdkKey: process.env.NEXT_PUBLIC_SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 10,
  eventFlushInterval: 1000,
});

const Article = ({ pageData, mostRead, service }) => {
  const isClientSide = typeof window !== 'undefined';
  const isMobile =
    isClientSide &&
    window.matchMedia(`(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`).matches;

  return (
    <OptimizelyProvider
      optimizely={optimizely}
      isServerSide={!isClientSide}
      timeout={ms('1s')}
      user={{
        id: getOptimizelyUserId(),
        attributes: {
          service,
          mobile: isMobile,
        },
      }}
    >
      <ArticlePage mostRead={mostRead} pageData={pageData} />
    </OptimizelyProvider>
  );
};

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
