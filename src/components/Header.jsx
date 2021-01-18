import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  header: {
    width: '100vw',
    backgroundColor: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 12px',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0
  },
  logo: {
    width: '130px',
    height: '60px',
    background: 'url("/full-logo.svg") no-repeat',
    backgroundSize: '130px 60px'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    color: 'black',
    fontSize: '28px',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'false'
    }
  },
  selectionButton: {
    marginInline: 10
  }
}));

function Header() {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <SettingsIcon style={{ color: 'black' }} />
          <h2 style={{ color: 'black', marginLeft: 10 }}> 관리자 페이지 </h2>
          <div className={classes.grow} />
          <Button
            component={Link}
            id="send-notification-link"
            to="/send-notification"
            variant="outlined"
            size="medium"
            className={classes.selectionButton}
          >
            Send Notification
          </Button>
          <Button
            component={Link}
            id="view-log-link"
            to="/view-log"
            variant="outlined"
            size="medium"
            className={classes.selectionButton}
          >
            View Log
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
