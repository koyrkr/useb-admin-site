import axios from 'axios';
import { FCMServerKey } from '../firebase.config';

export const SEND_NOTI_REQUEST = 'notification/SEND_NOTI_REQUEST';
export const SEND_NOTI_SUCCESS = 'notification/SEND_NOTI_SUCCESS';
export const SEND_NOTI_FAILURE = 'notification/SEND_NOTI_FAILURE';

const initialState = {};

export const sendNotification = (storeTokenKey, notiInfo) => async (
  dispatch
) => {
  dispatch({ type: 'notification/SEND_NOTI_REQUEST' });
  let result;
  const notiTitle = notiInfo.title;
  const notiMessage = notiInfo.message;

  try {
    result = await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        // eslint-disable-next-line prettier/prettier
        to: storeTokenKey,
        // 'e7rSw0PfRDilD45V9vpbv7:APA91bHVYdeE4W-CQGvq6e28-aMcEtnDb5dG0B6f1PPvjcuPWQcpzow-edZxTEVEgM_6JDb4jlVCl06UD0RTKYwavJeDRIMYlSHA5owZu4i4NoW09BPMQlYLY40zidAbx6UpRtNlY0-t',
        notification: {
          title: notiTitle,
          body: notiMessage,
          android_channel_id: 'custom-channel-id'
        },
        data: {
          customer_name: '박지나',
          passed: false
        }
      },
      {
        headers: {
          // eslint-disable-next-line prettier/prettier
          Authorization: `key=${FCMServerKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    dispatch({
      type: 'notification/SEND_NOTI_FAILURE',
      error
    });
    return;
  }
  dispatch({
    type: 'notification/SEND_NOTI_SUCCESS',
    result: result?.data.results
  });
};

export default function notiReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case SEND_NOTI_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
