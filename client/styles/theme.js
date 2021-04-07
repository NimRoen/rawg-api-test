const colors = {
  gray: '#c0c0c0',
  grayLight: '#e0e0e0',
  grayVeryLight: '#f0f0f0',
  grayDark: '#808080',
  grayVeryDark: '#404040',
  orange: '#ffb40f',
  violetVeryLight: '#d6abff',
  violetLight: '#7060c0',
  violet: '#504080',
  violetDark: '#282040',
  violetVeryDark: '#151020',
  black: '#000000',
  white: '#ffffff',
};

const fonts = {
  roboto: 'Roboto, sans-serif',
  sans: '"PT Sans", sans-serif',
};

export const theme = {
  light: {
    defaultColor: colors.black,
    defaultBackground: colors.white,
    defaultText: fonts.roboto,
    defaultTitle: fonts.sans,
    defaultBorder: colors.black,
    defaultTransition: '0.2s',
    actionColor: colors.violetLight,
    actionForeground: colors.white,
    actionBackground: colors.violetLight,
    disabledBackground: colors.grayLight,
    disabledColor: colors.grayDark,
    highlightColor: colors.black,
    highlightBackground: colors.violetVeryLight,
  },
  dark: {
    defaultColor: colors.white,
    defaultBackground: colors.violetVeryDark,
    defaultText: fonts.roboto,
    defaultTitle: fonts.sans,
    defaultBorder: colors.white,
    defaultTransition: '0.2s',
    actionColor: colors.violetVeryLight,
    actionForeground: colors.white,
    actionBackground: colors.violetLight,
    disabledBackground: colors.grayDark,
    disabledColor: colors.gray,
    highlightColor: colors.violetVeryLight,
    highlightBackground: colors.violetDark,
  },
};
