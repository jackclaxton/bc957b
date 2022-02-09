import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Hidden,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import LoginSignupView from "./components/LoginSignupView";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };
  // Passed to LoginSignupView to change route
  const onPressCreateAccount = () => {
    history.push("/register")
  }

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
      <LoginSignupView
        formTitle={'Welcome back!'}
        handleRouteChange={onPressCreateAccount}
        routeChangeButtonTitle={"Create account"}
        routeChangeSubtitle={"Don't have an account?"}>
        <form onSubmit={handleLogin}>
          <Grid item>
            <Grid item>
              <FormControl margin="normal" required fullWidth> 
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Password"
                aria-label="password"
                type="password"
                name="password"
                fullWidth
              />
            </FormControl>
            <Grid container item justifyContent={'center'}>
              <Button 
                type="submit" variant="contained" size="large" color={'primary'}>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </LoginSignupView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
