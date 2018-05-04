// @flow

// #region imports
import fadeIn from '../animations/fadeIn';
// #endregion

const globalStyles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      margin: 0,
    },
    ...fadeIn,
  },
});

export default globalStyles;
