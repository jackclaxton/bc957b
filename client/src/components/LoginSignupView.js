import React from 'react';
import {
  Hidden, 
  Grid,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import bgImg from '../assets/bg-img.png';
import bubbleSVG from '../assets/bubble.svg';

// Wrapper component for the Login & Signup screens to reduce code reuse and enable for easier editing
// Takes children - the form
// handleRouteChange - traveling between Login/Signup
// routeChangeSubtitle - subtitle for the route change button (i.e. "Don't have an account"/"Already have account?")
// routeChangeButtonTitle - title for the route change button (i.e. "Login"/"Signup")
// formTitle - title of form (i.e. "Welcome back!"/"Create account")

const LoginSignupView = ({children, handleRouteChange, routeChangeSubtitle, routeChangeButtonTitle, formTitle, }) => {
  return (
    <Grid container direction="row">
      <Hidden xsDown>
        <Grid container item sm={6}>
          <img src={bgImg} style={{ position: 'absolute', width: '50%', zIndex: -2, maxHeight: '100%', objectFit: 'cover', objectPosition: 'left top'}}/>
          <Box 
            sx={{ position: 'absolute', width: '50%', height: '100%', zIndex: -1, background: 'linear-gradient(0deg, rgba(58,141,255,1) 0%, rgba(169,205,255,0.7) 100%);',
            }}/>
          <Grid container item justifyContent={'center'} alignItems={'center'} direction={'column'}>
            <img src={bubbleSVG} style={{ width: '15%', paddingBottom: 30, paddingTop: 30}} />
            <Typography variant={'h5'} align={'center'} style={{ maxWidth: '80%', color: 'white'}}>Converse with anyone with any language</Typography>
          </Grid>
        </Grid>
      </Hidden>
      <Grid container item xs={12} sm={6}>
        <Box sx={{ width: '100%', justifyContent: 'flex-end', alignItems: 'center', display: 'flex', pt: 1, pr: 1}}>
          <Typography variant={'p'} color={'textSecondary'}>{routeChangeSubtitle}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
          <Button 
            onClick={handleRouteChange} 
            variant="contained"
            style={{ backgroundColor: 'white', color: '#3A8DFF',}}>{routeChangeButtonTitle}</Button>
        </Box>
        <Box container item xs={12} direction={"column"} sx={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', pt: 10, alignItems: 'center'}}>
          <Box container item sx={{ width: '75%'}}>
            <Typography variant={'h5'}>{formTitle}</Typography>
            {children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginSignupView;
