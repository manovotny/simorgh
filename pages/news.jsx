import useSWR from 'swr';
import news from '#data/news/frontPage/index.json';
import FrontPage from '#pages/FrontPage/FrontPage';
import { filterNews } from '../lib/filter';

const News = props => {
  const { data } = useSWR('/api/news');

  // MNTODO: Turn this into [service].jsx?
  return <FrontPage pageData={data || props} />;
};

export default News;

export async function getStaticProps() {
  const filteredNews = filterNews(news);

  return {
    props: {
      fallback: {
        '/api/news': filteredNews,
      },
    },
  };
}
