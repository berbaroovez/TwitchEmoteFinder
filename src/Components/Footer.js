import React,  {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
  
  menu: {
    marginBottom: '20px',
  },
  title: {
    margin: '0 auto',
    
  },
}));

export default function Footer() {
  
  
  const classes = useStyles();
  return (
    
    <Box
    m={2}
        display="flex" 
      >
        <Box m="auto">
        <Typography variant="p" className={classes.title}>
            This website was inspire by the original at <a href="https://slmn.io/emote">HERE</a>. I remade the website
            to learn how to use react functional components. Made by <a href="https://twitter.com/berbaroovez">Berbaroovez</a>
          </Typography>
        </Box>
      </Box>

          
    
    
  )
  }