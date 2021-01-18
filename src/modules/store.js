// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/database';
import { FirebaseConfig, FCMServerKey } from '../firebase.config';

export const GET_STORE_LIST_REQUEST = 'store/GET_STORE_LIST_REQUEST';
export const GET_STORE_LIST_SUCCESS = 'store/GET_STORE_LIST_SUCCESS';
export const GET_STORE_LIST_FAILURE = 'store/GET_STORE_LIST_FAILURE';

export const GET_STORE_TOKEN_KEY_REQUEST = 'store/GET_STORE_TOKEN_KEY_REQUEST';
export const GET_STORE_TOKEN_KEY_SUCCESS = 'store/GET_STORE_TOKEN_KEY_SUCCESS';
export const GET_STORE_TOKEN_KEY_FAILURE = 'store/GET_STORE_TOKEN_KEY_FAILURE';

export const GET_ALL_TOKEN_KEY_REQUEST = 'store/GET_ALL_TOKEN_KEY_REQUEST';
export const GET_ALL_TOKEN_KEY_SUCCESS = 'store/GET_ALL_TOKEN_KEY_SUCCESS';
export const GET_ALL_TOKEN_KEY_FAILURE = 'store/GET_ALL_TOKEN_KEY_FAILURE';

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const initialState = {
  storeList: [],
  selectedTokenKey: []
};

export const getStoreTokenKey = (storeName) => async (dispatch) => {
  dispatch({ type: 'store/GET_STORE_TOKEN_KEY_REQUEST' });
  let result;
  try {
    // getting notification key
    result = await axios.get(
      `https://fcm.googleapis.com/fcm/notification?notification_key_name=${storeName}`,
      {
        headers: {
          // eslint-disable-next-line prettier/prettier
          Authorization: `key=${FCMServerKey}`,
          'Content-Type': 'application/json',
          // eslint-disable-next-line prettier/prettier
          project_id: '543138816699',
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers
        }
      }
    );
    // console.log(result.data);
  } catch (error) {
    dispatch({
      type: 'store/GET_STORE_TOKEN_KEY_FAILURE',
      error
    });
    return;
  }
  dispatch({
    type: 'store/GET_STORE_TOKEN_KEY_SUCCESS',
    result: result?.data
    // selectedTokenKey :
  });
};

export const getAllTokenKey = () => async (dispatch) => {
  dispatch({ type: 'store/GET_ALL_TOKEN_KEY_REQUEST' });
  let result;
  try {
    // getting notification key
    result = await axios.get(
      `https://fcm.googleapis.com/fcm/notification?notification_key_name=All`,
      {
        headers: {
          // eslint-disable-next-line prettier/prettier
          Authorization: `key=${FCMServerKey}`,
          'Content-Type': 'application/json',
          'project-id': `${FirebaseConfig.messagingSenderId}`,
          // eslint-disable-next-line prettier/prettier
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    // console.log(result.data);
  } catch (error) {
    dispatch({
      type: 'store/GET_ALL_TOKEN_KEY_FAILURE',
      error
    });
    return;
  }
  dispatch({
    type: 'store/GET_ALL_TOKEN_KEY_SUCCESS',
    result: result?.data
    // selectedTokenKey :
  });
};

export const getStoreList = () => async (dispatch) => {
  dispatch({ type: 'store/GET_STORE_LIST_REQUEST' });
  let result;
  const tempStoreList = [{ name: '전체' }];
  try {
    result = await axios.get(
      `https://realpass-a7db8-default-rtdb.firebaseio.com/stores.json`
    );
    Object.keys(result.data).forEach((store) =>
      tempStoreList.push({ name: store })
    );
    // console.log(tempStoreList);
  } catch (error) {
    dispatch({
      type: 'store/GET_STORE_LIST_FAILURE',
      error
    });
    return;
  }
  dispatch({
    type: 'store/GET_STORE_LIST_SUCCESS',
    result: result?.data,
    storeList: tempStoreList
  });
};

export default function storeReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case GET_STORE_LIST_SUCCESS:
      return {
        ...state,
        storeList: action.storeList
      };
    default:
      return state;
  }
}
