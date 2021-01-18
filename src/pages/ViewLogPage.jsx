/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LogTable from '../components/LogTable';
import { getStoreLog, getAllLog } from '../modules/log';
import { getStoreList } from '../modules/store';

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
  row: {
    display: 'flex'
  },
  table: {
    minWidth: 500
  }
}));

const ViewLogPage = () => {
  const classes = useStyles();
  const [store, setStore] = useState('전체');
  const rows = useSelector(
    (state) => state.logReducer.selectedStoreLogRows,
    shallowEqual
  );
  const storeList = useSelector((state) => state.storeReducer.storeList);
  const logCount = Object.keys(rows).length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoreList());
    dispatch(getAllLog());
  }, []);

  useEffect(() => {
    if (store === '전체') {
      dispatch(getAllLog());
    } else {
      dispatch(getStoreLog(store));
    }
  }, [store]);

  const handleChange = (event, value) => {
    setStore(value);
  };

  return (
    <MainWrapper>
      <h1> View Log </h1>
      <div className={classes.row}>
        <div className={classes.root}>
          <Autocomplete
            noOptionsText="검색 결과 없음"
            onInputChange={handleChange}
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
      </div>
      {store && (
        <h3>
          {' '}
          {store} Log ({logCount}){' '}
        </h3>
      )}
      <LogTable rows={rows} />
    </MainWrapper>
  );
};

export default ViewLogPage;
