import news from '#data/news/frontPage/index.json';
import ms from 'ms';
import { filterNews } from '../../lib/filter';

const handler = async (request, response) => {
  const filteredNews = filterNews(news);

  response.setHeader(
    'Cache-Control',
    `public, s-maxage=${ms('1h')}, stale-while-revalidate=${ms('15m')}`,
  );
  response.status(200);
  response.json(filteredNews);

  return response;
};

export default handler;
