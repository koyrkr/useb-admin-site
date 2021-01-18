/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { CommonInput, CommonButton } from '../styles';
import { sendNotification } from '../modules/notification';
import {
  // getStoreTokenKey,
  getAllTokenKey,
  getStoreList
} from '../modules/store';

const MainWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-top: 80px;
`;

const useStyles = makeStyles(() => ({
  root: {
    width: 500,
    marginBottom: 20
  },
  textarea: {
    padding: '5px',
    borderRadius: '2px',
    color: 'rgb(50, 50, 50)',
    fontSize: '14px',
    outline: 'none !important',
    width: '100%',
    height: 'auto',
    boxSizing: 'border-box',
    border: 'none',
    margin: '4px 0',
    background: '#fff',
    cursor: 'auto',
    resize: 'none',
    overflow: 'hidden',
    fontFamily: 'Noto Sans KR, sans-serif'
  }
}));

const SendNotificationPage = () => {
  const classes = useStyles();
  const [notiInfo, setNotiInfo] = useState({ title: '', message: '' });
  const [storeName, setStoreName] = useState('');
  const selectedTokenKey = useSelector(
    (state) => state.storeReducer.selectedTokenKey
  );
  const storeList = useSelector((state) => state.storeReducer.storeList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoreList());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotiInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoreChange = (event, value) => {
    setStoreName(value);
  };

  const onClickSubmit = () => {
    // console.log(storeName);
    if (storeName === '전체') {
      dispatch(getAllTokenKey());
      // console.log(selectedTokenKey);
      sendNotification(selectedTokenKey, notiInfo);
    } else {
      // dispatch(getStoreTokenKey(storeName));
      // console.log(selectedTokenKey);
      // sendNotification(selectedTokenKey, notiInfo);
      dispatch(
        sendNotification(
          'fJp7byCjQdyD9VE7cSKMCx:APA91bGliXs52hGLGIbkwianlNcWTuUbhIEEmfBaSAAYIt6iSImq2BCh3EpA-ts-NEuzCO003MOy8AKkmYMrGjOsHixwxtlj2npSBrVaHdvqoFW-Nanrgu0eg_VHSM9r4j7iZzP57TvQ',
          notiInfo
        )
      );
    }
    setNotiInfo({ title: '', message: '' });
  };

  return (
    <MainWrapper>
      <h1> Send Notification </h1>
      <div className={classes.root}>
        <Autocomplete
          onInputChange={handleStoreChange}
          noOptionsText="검색 결과 없음"
          id="select-store"
          size="small"
          options={storeList}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => value.name === option.name}
          defaultValue={{ name: '전체' }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Store"
              placeholder=""
            />
          )}
        />
      </div>
      <CommonInput
        id="title-input"
        name="title"
        value={notiInfo.title}
        placeholder="Title"
        onChange={handleChange}
      />
      <CommonInput
        id="message-input"
        name="message"
        value={notiInfo.message}
        placeholder="Message"
        onChange={handleChange}
      />
      <CommonButton
        id="submit-button"
        disabled={notiInfo.title === '' || notiInfo.message === ''}
        margin="20px 0"
        onClick={onClickSubmit}
      >
        Send
      </CommonButton>
    </MainWrapper>
  );
};

export default SendNotificationPage;
