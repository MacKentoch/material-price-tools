// @flow

// #region flow types
export type Menu = {
  id: number,
  title: string,
  routeName: string,
};
// #endregion

// #region constants
// adjust endpoint depending environment:
let endpointBaseUrl = 'http://5ae97684531a58001414278c.mockapi.io';
if (process.env !== 'production') {
  endpointBaseUrl = 'http://5ae97684531a58001414278c.mockapi.io';
}
// #endregion

// #region appConfig
const appConfig = {
  APP_NAME: 'Material Price Tool',

  // agencies endpoint
  endpoints: {
    agencies: `${endpointBaseUrl}/agencies`,
  },

  // date format (better i18n but it would be a huge hammer for this case)
  dateFormat: 'DD/MM/YYYY',

  // sw path
  sw: {
    path: 'public/assets/sw.js',
  },
};
// #endregion

export default appConfig;
