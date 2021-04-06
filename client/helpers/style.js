export const CONTENT_WIDTH_MAX = 1920;

const screenSizes = {
  mobile: 600,
  tablet: 1200,
  desktop: 1800,
};

export const mediaSelector = {
  hoverSupported: '@media not all and (hover: none)',
  mobile: `@media(max-width: ${screenSizes.mobile - 1}px)`,
  tablet: `@media(min-width: ${screenSizes.mobile}px, max-width: ${screenSizes.tablet - 1}px)`,
  desktop: `@media(min-width: ${screenSizes.tablet}px, max-width: ${screenSizes.desktop - 1}px)`,
  wide: `@media(mix-width: ${screenSizes.desktop}px)`,
};
