import news from '#data/news/frontPage/index.json';
import ms from 'ms';

const handler = async (request, response) => {
  response.setHeader(
    'Cache-Control',
    `public, s-maxage=${ms('1h')}, stale-while-revalidate=${ms('15m')}`,
  );
  response.status(200);
  response.json(news);

  return response;
};

export default handler;
