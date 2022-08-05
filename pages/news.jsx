import styled from '@emotion/styled';

const P = styled.p`
  color: black;
  font-weight: bold;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const News = () => <P>{'News'}</P>;

export default News;
