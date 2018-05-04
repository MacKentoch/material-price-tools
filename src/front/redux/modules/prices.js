// @flow

// #region imports
import axios from 'axios';
import { type Dispatch } from 'redux';
import { type State, type Price } from './prices.types';
import appConfig from '../../config/appConfig';
import sortPricesByStartDate from '../../utils/prices/sortByDate';
// #endregion

// #region CONSTANTS
const REQUEST_GET_ALL_PRICES = 'REQUEST_GET_ALL_PRICES';
const RECEIVED_GET_ALL_PRICES = 'RECEIVED_GET_ALL_PRICES';
const ERROR_GET_ALL_PRICES = 'ERROR_GET_ALL_PRICES';

const {
  endpoints: { agencies: agenciesEnpoint },
} = appConfig;
// #endregion

// #region flow types
type ActionType =
  | 'REQUEST_GET_ALL_PRICES'
  | 'RECEIVED_GET_ALL_PRICES'
  | 'ERROR_GET_ALL_PRICES';

type Action = {
  type: ActionType,

  list?: Array<Price>,
} & Action;
// #endregion

// #region reducer

// #region  -- initial state
const initialState: State = {
  isLoading: false,
  list: [],
};
// #endregion

// #region reducer function
export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    // #region get agencies
    case REQUEST_GET_ALL_PRICES: {
      return { ...state, isLoading: true };
    }

    case RECEIVED_GET_ALL_PRICES: {
      const { list } = action;
      return { ...state, isLoading: false, list };
    }

    case ERROR_GET_ALL_PRICES: {
      return { ...state, isLoading: true };
    }

    default:
      return state;
    // #endregion
  }
}
// #endregion

// #endregion

// #region get all price ranges from Firebase
function requestGetAllPrices() {
  return { type: REQUEST_GET_ALL_PRICES };
}
function receivedGetAllPrices(list: Array<Price>) {
  return { type: RECEIVED_GET_ALL_PRICES, list };
}
function errorGetAllPrices(error: any = null) {
  return { type: ERROR_GET_ALL_PRICES, error };
}

export function getAllPricesIfNeeded(agencyId: string, categoryId: string) {
  return async (
    dispatch: Dispatch<State>,
    getState: () => { ...any } & State,
  ): Promise<Action> => {
    // // NOTE: we could add (depending use case) a condition before fetching:
    // const { isLoading } = getState().prices;
    // if (isLoading) {
    //   return {alreadyFetching: true};
    // }

    if (!agencyId) {
      const error = {
        message: 'getAllPricesIfNeeded needs agencyId argument',
      };
      dispatch(errorGetAllPrices(error));
      return error;
    }

    if (!categoryId) {
      const error = {
        message: 'getAllPricesIfNeeded needs categoryId argument',
      };
      dispatch(errorGetAllPrices(error));
      return error;
    }

    try {
      dispatch(requestGetAllPrices());

      const method = 'GET';
      const url = `${agenciesEnpoint}/${agencyId}/categories/${categoryId}/prices`;

      const response = await axios.request({
        method,
        url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const { status, data } = response;

      if (status !== 200) {
        const error = { message: 'getAllPricesIfNeeded failed', status, data };
        dispatch(errorGetAllPrices(error));
        return error;
      }

      const list = sortPricesByStartDate([...data], 'asc');
      dispatch(receivedGetAllPrices(list));
      return { list };
    } catch (error) {
      dispatch(errorGetAllPrices(error));
      return error;
    }
  };
}
// #endregion

// #endregion
