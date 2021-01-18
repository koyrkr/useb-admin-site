import axios from 'axios';

export const GET_STORE_LOG_REQUEST = 'log/GET_STORE_LOG_REQUEST';
export const GET_STORE_LOG_SUCCESS = 'log/GET_STORE_LOG_SUCCESS';
export const GET_STORE_LOG_FAILURE = 'log/GET_STORE_LOG_FAILURE';

export const GET_ALL_LOG_REQUEST = 'log/GET_ALL_LOG_REQUEST';
export const GET_ALL_LOG_SUCCESS = 'log/GET_ALL_LOG_SUCCESS';
export const GET_ALL_LOG_FAILURE = 'log/GET_ALL_LOG_FAILURE';

const initialState = {
  selectedStore: '',
  selectedStoreLogRows: []
};

export const getStoreLog = (storeName) => async (dispatch) => {
  dispatch({ type: 'log/GET_STORE_LOG_REQUEST' });
  let result;
  const tempLogRows = [];
  try {
    result = await axios.get(
      `https://realpass-a7db8-default-rtdb.firebaseio.com/stores/${storeName}/log.json`
    );
    // console.log(storeName);
    Object.values(result?.data).forEach((log) => {
      if (log !== null) {
        tempLogRows.push(log);
      }
    });
  } catch (error) {
    dispatch({
      type: 'log/GET_STORE_LOG_FAILURE',
      error
    });
    return;
  }
  dispatch({
    type: 'log/GET_STORE_LOG_SUCCESS',
    result: result?.data,
    selectedStore: storeName,
    selectedStoreLogRows: tempLogRows
  });
};

export const getAllLog = () => async (dispatch) => {
  dispatch({ type: 'log/GET_ALL_LOG_REQUEST' });
  let result;
  const tempLogRows = [];
  try {
    result = await axios.get(
      `https://realpass-a7db8-default-rtdb.firebaseio.com/stores.json`
    );
    Object.values(result.data).forEach((store) => {
      Object.values(store.log).forEach((log) => {
        if (log !== null) {
          tempLogRows.push(log);
        }
      });
    });
    // console.log(tempLogRows);
  } catch (error) {
    dispatch({
      type: 'log/GET_ALL_LOG_FAILURE',
      error
    });
    return;
  }
  dispatch({
    type: 'log/GET_ALL_LOG_SUCCESS',
    result: result?.data,
    selectedStore: '전체',
    selectedStoreLogRows: tempLogRows
  });
};

export default function logReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case GET_ALL_LOG_SUCCESS:
    case GET_STORE_LOG_SUCCESS:
      return {
        ...state,
        selectedStore: '',
        selectedStoreLogRows: action.selectedStoreLogRows
      };
    default:
      return state;
  }
}
