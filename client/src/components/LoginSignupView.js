import React from 'react';
import {
  Hidden, 
  Grid,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from '../assets/bg-img.png';
import bubbleSVG from '../assets/bubble.svg';

const LoginSignupView = ({children, handleRouteChange, routeChangeSubtitle, routeChangeButtonTitle, formTitle, }) => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Hidden xsDown>
        <Grid container item sm={6}>
          <img alt='Background image' src={backgroundImage} className={classes.backgroundImage}/>
          <Box className={classes.gradientOverlay}/>
          <Grid container item justifyContent={'center'} alignItems={'center'} direction={'column'}>
            <img alt={'Message bubble'} src={bubbleSVG} className={classes.bubbleIcon} />
            <Typography variant={'h5'} className={classes.logoText}>Converse with anyone with any language</Typography>
          </Grid>
        </Grid>
      </Hidden>
      <Grid container item xs={12} sm={6}>
        <Box className={classes.routeChangeContainer}>
          <Typography variant={'p'} color={'textSecondary'}>{routeChangeSubtitle}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
          <Button 
            onClick={handleRouteChange} 
            variant="contained"
            className={classes.routeChangeButton}>{routeChangeButtonTitle}</Button>
        </Box>
        <Box className={classes.outerFormContainer}>
          <Box className={classes.formContainer}>
            <Typography variant={'h4'}>{formTitle}</Typography>
            {children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
export default LoginSignupView;


const useStyles = makeStyles(() => ({
  backgroundImage: {
    position: 'absolute', 
    width: '50%', 
    zIndex: -2, 
    maxHeight: '100%', 
    objectFit: 'cover', 
    objectPosition: 'left top'
  },
  gradientOverlay: {
    position: 'absolute', 
    width: '50%', 
    height: '100%', 
    zIndex: -1, 
    background: 'linear-gradient(0deg, rgba(58,141,255,1) 0%, rgba(169,205,255,0.7) 100%);',
  },
  bubbleIcon: {
    width: '15%',
    paddingBottom: 30, 
    paddingTop: 30
  },
  logoText:{
    maxWidth: '80%', 
    color: 'white',
    textAlign: 'center',
  },
  routeChangeContainer:{ 
    width: '100%', 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    display: 'flex', 
    paddingTop: 15, 
    paddingRight: 20
  },
  routeChangeButton:{
    backgroundColor: 'white', 
    color: '#3A8DFF',
    marginLeft: 10,
  },
  outerFormContainer:{
    display: 'flex',
    direction: 'column',
    width: '100%', 
    justifyContent: 'center',
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    paddingTop: '10vw'
  },
  formContainer:{
    width: '75%'
  }
}))