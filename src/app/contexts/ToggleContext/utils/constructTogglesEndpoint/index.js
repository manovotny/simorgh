export default (service, origin) => {
  const requestOrigin = origin || 'https://www.test.bbc.com';
  const baseTogglesUrl = `${process.env.NEXT_PUBLIC_SIMORGH_CONFIG_URL}?application=simorgh&service=${service}&__amp_source_origin=${requestOrigin}`; // __amp_source_origin is relevant to both canonical and amp

  return baseTogglesUrl;
};
