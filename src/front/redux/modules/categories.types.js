// @flow

export type Category = {
  id: string,
  agencyId: string,
  name: string,
  code: string,
};

export type State = {
  isLoading: boolean,
  list: Array<Category>,

  ...any,
};

// #region action creators types (usefull for connected components)
type Error = { ...any };

export type GetAllCategoriesIfNeeded = (
  agencyId: string,
) => Promise<Array<Category> | Error>;
// #endregion
