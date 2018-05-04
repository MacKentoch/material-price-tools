// @flow

// #region imports
import { createMuiTheme } from 'material-ui/styles';
import cyan from 'material-ui/colors/cyan';
import amber from 'material-ui/colors/amber';
import spacing from 'material-ui/styles/spacing';
// #endregion

// #region constants
const white = '#FFFFFF';
const darkBlack = '#000';
// #endregion

const theme = createMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  direction: 'ltr',
  palette: {
    primary: {
      light: cyan[200],
      main: cyan[400],
      dark: cyan[700],
      contrastText: white,
    },
    secondary: {
      light: amber[200],
      main: amber[400],
      dark: amber[700],
      contrastText: darkBlack,
    },
  },
});

export default theme;
