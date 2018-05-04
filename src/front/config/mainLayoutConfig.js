// @flow

// #region imports
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
// #endregion

// NOTE: to support multiple layouts, we split config files (since it contains components which may not be shared accross each layouts)
const mainLayoutConfig = {
  drawer: {
    width: 240,
    menus: [
      { id: 1, title: 'Search price', routeName: '/', icon: SearchIcon },
      { id: 2, title: 'About', routeName: 'about', icon: InfoIcon },
    ],
  },
};

export default mainLayoutConfig;
