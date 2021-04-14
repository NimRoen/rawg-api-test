export const CONTENT_WIDTH_MAX = 1920;

const screenSizes = {
  mobile: 600,
  wideMobile: 800,
  tablet: 1200,
  wideTablet: 1600,
  desktop: 1800,
};

export const mediaSelector = {
  hoverSupported: '@media not all and (hover: none)',
  mobile: `@media(max-width: ${screenSizes.mobile - 1}px)`,
  wideMobile: `@media(max-width: ${screenSizes.wideMobile - 1}px)`,
  tablet: `@media(max-width: ${screenSizes.tablet - 1}px)`,
  wideTablet: `@media(max-width: ${screenSizes.wideTablet - 1}px)`,
  desktop: `@media(max-width: ${screenSizes.desktop - 1}px)`,
  wide: `@media(min-width: ${screenSizes.desktop}px)`,
};

export const scrollbar = (theme, width = 4) => {
  return `
    &::-webkit-scrollbar {
      width: ${width}px;
    }

    &::-webkit-scrollbar-track {
      margin: 3px;
      background-color: ${theme.scrollbarBackground};
      border-radius: ${width/2}px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.scrollbarForeground};
      border-radius: ${width/2}px;
    }
  `;
};
