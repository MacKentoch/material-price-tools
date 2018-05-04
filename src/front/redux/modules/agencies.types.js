// @flow

export type Agency = {
  id: string,
  name: string,
  code: string,
};

export type State = {
  isLoading: boolean,
  list: Array<Agency>,

  ...any,
};

// #region action creators types (usefull for connected components)
type Error = { ...any };

export type GetAllAgenciesIfNeeded = () => Promise<Array<Agency> | Error>;
// #endregion
