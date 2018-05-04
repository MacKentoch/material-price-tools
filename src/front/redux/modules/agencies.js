// @flow

// #region imports
import axios from 'axios';
import { type Dispatch } from 'redux';
import { type State, type Agency } from './agencies.types';
import appConfig from '../../config/appConfig';
// #endregion

// #region CONSTANTS
const REQUEST_GET_ALL_AGENCIES = 'REQUEST_GET_ALL_AGENCIES';
const RECEIVED_GET_ALL_AGENCIES = 'RECEIVED_GET_ALL_AGENCIES';
const ERROR_GET_ALL_AGENCIES = 'ERROR_GET_ALL_AGENCIES';

const {
  endpoints: { agencies: agenciesEnpoint },
} = appConfig;
// #endregion

// #region flow types
type ActionType =
  | 'REQUEST_GET_ALL_AGENCIES'
  | 'RECEIVED_GET_ALL_AGENCIES'
  | 'ERROR_GET_ALL_AGENCIES';

type Action = {
  type: ActionType,

  list?: Array<Agency>,
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
    case REQUEST_GET_ALL_AGENCIES: {
      return { ...state, isLoading: true };
    }

    case RECEIVED_GET_ALL_AGENCIES: {
      const { list } = action;
      return { ...state, isLoading: false, list };
    }

    case ERROR_GET_ALL_AGENCIES: {
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
function requestGetAllAgencies() {
  return { type: REQUEST_GET_ALL_AGENCIES };
}
function receivedGetAllAgencies(list: Array<Agency>) {
  return { type: RECEIVED_GET_ALL_AGENCIES, list };
}
function errorGetAllAgencies(error: any = null) {
  return { type: ERROR_GET_ALL_AGENCIES, error };
}

export function getAllAgenciesIfNeeded() {
  return async (
    dispatch: Dispatch<State>,
    getState: () => { ...any } & State,
  ): Promise<Action> => {
    // // NOTE: we could add (depending use case) a condition before fetching:
    // const { isLoading } = getState().agencies;
    // if (isLoading) {
    //   return {alreadyFetching: true};
    // }

    try {
      dispatch(requestGetAllAgencies());

      const method = 'GET';
      const url = `${agenciesEnpoint}`;

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
          message: 'getAllAgenciesIfNeeded failed',
          status,
          data,
        };
        dispatch(errorGetAllAgencies(error));
        return error;
      }

      const list = [...data];
      dispatch(receivedGetAllAgencies(list));
      return { list };
    } catch (error) {
      dispatch(errorGetAllAgencies(error));
      return error;
    }
  };
}
// #endregion

// #endregion
