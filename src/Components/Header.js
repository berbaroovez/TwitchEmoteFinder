import React,  {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  
  menu: {
    marginBottom: '20px',
  },
  title: {
    margin: '0 auto',
    
  },
}));

function Header() {
  
  
  const classes = useStyles();
  return (
    
    <header>
        <AppBar className={classes.menu} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Twitch Channel Emote Finder
          </Typography>
          
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;