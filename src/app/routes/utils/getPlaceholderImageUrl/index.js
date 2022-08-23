import is from 'ramda/src/is';

export const FALLBACK_PLACEHOLDER_IMAGE_URL = '/images/media_placeholder.png';

const getPlaceholderImageUrl = imageUrl => {
  if (imageUrl && is(String, imageUrl)) {
    return `https://${imageUrl.replace('$recipe', '1024x576')}`;
  }

  return FALLBACK_PLACEHOLDER_IMAGE_URL;
};

export default getPlaceholderImageUrl;
