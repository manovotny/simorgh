import ms from 'ms';
import FrontPage from '#pages/FrontPage/FrontPage';
import { getFrontPageProps, getServices } from '../../lib/fake-bbc-api';

const News = ({ pageData, mostRead }) => {
  return <FrontPage mostRead={mostRead} pageData={pageData} />;
};

export const getStaticPaths = () => {
  const services = getServices();
  const paths = services.map(result => `/${result}`);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
  const { service } = params;
  const props = await getFrontPageProps(service);

  return {
    props,
    revalidate: ms('5m'),
  };
};

export default News;
