import styled from '@emotion/styled';
import React from 'react';

const P = styled.p`
  color: black;
  font-weight: bold;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const News = () => <P>News</P>;

export default News;
