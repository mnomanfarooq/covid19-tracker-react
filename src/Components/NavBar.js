import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Logo from './../images/covid19.gif'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
    display: 'block',
    },
  },
}));


export default function NavBar() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <AppBar position="static">
        <Toolbar  style={{ color: 'white', backgroundColor: 'rgba(50,50,50,0.8)' }}>
          <Typography className={classes.title} variant="h6" noWrap>
            Covid19-Tracker by M. Noman Farooq
          </Typography>
            <img src={Logo} width={35} height={35}/>
        </Toolbar>
      </AppBar>

    </div>
  );
}