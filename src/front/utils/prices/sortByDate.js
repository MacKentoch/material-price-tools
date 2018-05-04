// @flow

// #region imports
import compareAsc from 'date-fns/compare_asc';
import compareDesc from 'date-fns/compare_desc';
import { type Price } from '../../redux/modules/prices.types';
// #endregion

// #region flow types
type Sort = 'desc' | 'asc';
// #endregion

function sortPricesByStartDate(
  prices: Array<Price> = [],
  sort: Sort = 'asc',
): Array<?Price> {
  if (!Array.isArray(prices)) {
    return [];
  }

  const sortFunction = sort === 'asc' ? compareAsc : compareDesc;

  const sortedPrices = prices.sort(
    ({ startDate: dateA }, { startDate: dateB }) =>
      sortFunction(new Date(dateA), new Date(dateB)),
  );

  return sortedPrices;
}

export default sortPricesByStartDate;
