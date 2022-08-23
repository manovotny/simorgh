import React, { useContext } from 'react';
import Link from 'next/link';
import { pathToRegexp } from 'path-to-regexp';
import InlineLink from '#psammead/psammead-inline-link/src';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import { inlineLinkModelPropTypes } from '#models/propTypes/inlineLink';
import makeRelativeUrlPath from '#lib/utilities/makeRelativeUrlPath';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import { articlePath } from '../../../routes/utils/regex';

const componentsToRender = { fragment };

const InlineLinkContainer = ({ locator, isExternal, blocks, onClick }) => {
  const { externalLinkText } = useContext(ServiceContext);
  const regexp = pathToRegexp(articlePath, [], {
    start: false,
    end: false,
  });

  const result = regexp.exec(locator);
  // if URL matches a valid route, use a react-router link
  if (result) {
    // the path is the first item in the array
    const path = result[0];
    const hash = locator.split('#')[1] || null;
    return (
      <Link href={`${path}#${hash}`} passHref>
        <InlineLink>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </InlineLink>
      </Link>
    );
  }

  const linkText = pathOr(null, [0, 'model', 'text'], blocks);
  return (
    <Link href={makeRelativeUrlPath(locator)} passHref>
      <InlineLink
        aria-label={isExternal ? `${linkText}${externalLinkText}` : null}
        onClick={event => {
          if (onClick) {
            onClick(event);
          }
        }}
      >
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </InlineLink>
    </Link>
  );
};

InlineLinkContainer.propTypes = inlineLinkModelPropTypes;

export default InlineLinkContainer;
