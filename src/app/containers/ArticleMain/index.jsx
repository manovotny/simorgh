import React, { Fragment } from 'react';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostWrapper } from '../../lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';
import audioVideo from '../AudioVideo';
import AudioVideoHead from '../../components/AudioVideoHead';
import { RequestContext } from '../../contexts/RequestContext';
import MediaPlayerSettings from '../AudioVideo/mediaPlayerSettings';
import deepGet from '../../lib/utilities/deepGet';
import filterForBlockType from '../../lib/utilities/blockHandlers';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
  video: audioVideo,
};

const ArticleMain = ({ articleData }) => {
  const { platform } = React.useContext(RequestContext);
  const { content, metadata, promo } = articleData;
  const { blocks } = content.model;

  const audioVideoBlocks = blocks.filter(
    block => block.type === 'audio' || block.type === 'video',
  );

  return (
    <Fragment>
      <ATIAnalytics data={articleData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      {platform === 'canonical' ? (
        <AudioVideoHead
          audioVideoAssets={audioVideoBlocks.map(avBlock => {
            // The following lines are just to fetch the pid
            // that is needed for ids on the media player placeholder divs
            // and aresMediaBlocksArray to generate the mediaPlayerSettings
            // object which needs to be passed to AudioVideoHead
            const toplevelblock = deepGet(['model', 'blocks'], avBlock);
            const aresMediaBlock = filterForBlockType(
              toplevelblock,
              'aresMedia',
            );
            const aresMediaBlocksArray = deepGet(
              ['model', 'blocks'],
              aresMediaBlock,
            );
            const aresMediaMetadata = filterForBlockType(
              aresMediaBlocksArray,
              'aresMediaMetadata',
            );
            const pid = deepGet(['model', 'id'], aresMediaMetadata);

            return {
              id: pid,
              mediaPlayerSettings: MediaPlayerSettings({
                aresMediaBlocks: aresMediaBlocksArray,
              }),
            };
          })}
        />
      ) : null}
      <main role="main">
        <GhostWrapper>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </GhostWrapper>
      </main>
    </Fragment>
  );
};

ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};

export default ArticleMain;
