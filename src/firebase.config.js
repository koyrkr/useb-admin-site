/* eslint-disable global-require */
const { google } = require('googleapis');

export const FirebaseConfig = {
  apiKey: 'AIzaSyCRZthI7CreaJbdx-NzxFIHMP8zj0Y7MBI',
  authDomain: 'realpass-a7db8.firebaseapp.com',
  databaseURL: 'https://realpass-a7db8-default-rtdb.firebaseio.com',
  projectId: 'realpass-a7db8',
  storageBucket: 'realpass-a7db8.appspot.com',
  messagingSenderId: '543138816699',
  appId: '1:543138816699:web:a6ff92f849c62ead987f9e',
  measurementId: 'G-JQHZC2YD5N'
};

export const FCMServerKey =
  'AAAAfnWYors:APA91bF8IqK4-SX7LdOmoQOTX2zrufvfsA6lnY1PCT_aFkLgEnX6-fDeST7pd0vGXsU2Vz-XsOiFAhte-YGqiT4ISdeM7S9M9hMgHlB3Prx9Y0T4nDrvQ-EgCcHKju8eY2ZfiPeDQeKy';

function getAccessToken() {
  return new Promise((resolve, reject) => {
    const key = require('./service-account.json');
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      'https://www.googleapis.com/auth/firebase.messaging',
      null
    );
    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

export const BearerAuthToken = getAccessToken();
