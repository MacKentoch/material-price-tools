// @flow

// #region imports
import axios from 'axios';
import { type Dispatch } from 'redux';
import { type State, type Category } from './categories.types';
import appConfig from '../../config/appConfig';
// #endregion

// #region CONSTANTS
const REQUEST_GET_ALL_CATEGORIES = 'REQUEST_GET_ALL_CATEGORIES';
const RECEIVED_GET_ALL_CATEGORIES = 'RECEIVED_GET_ALL_CATEGORIES';
const ERROR_GET_ALL_CATEGORIES = 'ERROR_GET_ALL_CATEGORIES';

const {
  endpoints: { agencies: agenciesEnpoint },
} = appConfig;
// #endregion

// #region flow types
type ActionType =
  | 'REQUEST_GET_ALL_CATEGORIES'
  | 'RECEIVED_GET_ALL_CATEGORIES'
  | 'ERROR_GET_ALL_CATEGORIES';

type Action = {
  type: ActionType,

  list?: Array<Category>,
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
    case REQUEST_GET_ALL_CATEGORIES: {
      return { ...state, isLoading: true };
    }

    case RECEIVED_GET_ALL_CATEGORIES: {
      const { list } = action;
      return { ...state, isLoading: false, list };
    }

    case ERROR_GET_ALL_CATEGORIES: {
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
function requestGetAllCategories() {
  return { type: REQUEST_GET_ALL_CATEGORIES };
}
function receivedGetAllCategories(list: Array<Category>) {
  return { type: RECEIVED_GET_ALL_CATEGORIES, list };
}
function errorGetAllCategories(error: any = null) {
  return { type: ERROR_GET_ALL_CATEGORIES, error };
}

export function getAllCategoriesIfNeeded(agencyId: string) {
  return async (
    dispatch: Dispatch<State>,
    getState: () => { ...any } & State,
  ): Promise<Action> => {
    // // NOTE: we could add (depending use case) a condition before fetching:
    // const { isLoading } = getState().categories;
    // if (isLoading) {
    //   return {alreadyFetching: true};
    // }

    if (!agencyId) {
      const error = {
        message: 'getAllCategoriesIfNeeded needs agencyId argument',
      };
      dispatch(errorGetAllCategories(error));
      return error;
    }

    try {
      dispatch(requestGetAllCategories());

      const method = 'GET';
      const url = `${agenciesEnpoint}/${agencyId}/categories`;

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
        const error = {
          message: 'getAllCategoriesIfNeeded failed',
          status,
          data,
        };
        dispatch(errorGetAllCategories(error));
        return error;
      }

      const list = [...data];
      dispatch(receivedGetAllCategories(list));
      return { list };
    } catch (error) {
      dispatch(errorGetAllCategories(error));
      return error;
    }
  };
}
// #endregion

// #endregion
