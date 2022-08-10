// Mimics `src/app/routes/home/getInitialData/index.js`

import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToGroups from '#app/routes/utils/sharedDataTransformers/addIdsToGroups';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';

const filterNews = pageData => {
  let filtered = pageData;

  filtered = filterUnknownContentTypes(filtered);
  filtered = filterEmptyGroupItems(filtered);
  filtered = addIdsToGroups(filtered);
  filtered = squashTopStories(filtered);
  filtered = filterGroupsWithoutStraplines(filtered);

  return filtered;
};

export { filterNews };
