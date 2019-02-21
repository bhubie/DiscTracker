const mediaQueries = {
  maxWidth750: {
    value: '@media (max-width : 750px)',
    minPixels: 0,
    maxPixels: 750,
  },

  mobile: {
    value: '@media (max-width : 750px)',
    minPixels: 0,
    maxPixels: 768,
  },
  tablet: {
    value: '@media (max-width : 750px)',
    minPixels: 769,
    maxPixels: 1023,
  },
  desktop: {
    value: '@media (max-width : 750px)',
    minPixels: 1024,
    maxPixels: 1215,
  },
  widescreen: {
    value: '@media (max-width : 750px)',
    minPixels: 1216,
    maxPixels: 1407,
  },
  fullhd: {
    value: '@media (max-width : 750px)',
    minPixels: 1408,
    maxPixels: 999999999,
  },
};


export { mediaQueries };
