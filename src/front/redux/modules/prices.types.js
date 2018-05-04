// @flow

export type Price = {
  id: string,
  categoryId: string,
  startDate: Date,
  price: number,
  suggestedPrice: number,
  isValidated: boolean,
};

export type State = {
  isLoading: boolean,
  list: Array<Price>,
  ...any,
};

// #region action creators types (usefull for connected components)
type Error = { ...any };

export type GetAllPricesIfNeeded = (
  agencyId: string,
  categoryId: string,
) => Promise<Array<Price> | Error>;
// #endregion
