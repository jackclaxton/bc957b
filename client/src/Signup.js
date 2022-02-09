import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import LoginSignupView from "./components/LoginSignupView";

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };
  // Passed to LoginSignupView to change route
  const onPressLogin = () => {
    history.push("/login")
  }
  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <LoginSignupView
      formTitle={'Create an account.'}
      handleRouteChange={onPressLogin}
      routeChangeButtonTitle={"Login"}
      routeChangeSubtitle={"Already have an account?"}>
      <form onSubmit={handleRegister}>
        <Grid item>
          <Grid item>
            <FormControl margin="normal" required fullWidth>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                required
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl error={!!formErrorMessage.confirmPassword} margin="normal" required fullWidth>
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                required
                fullWidth
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid>
            <FormControl error={!!formErrorMessage.confirmPassword} margin="normal" required fullWidth>
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
                fullWidth
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container item justifyContent={'center'}>
            <Button type="submit" variant="contained" size="large" color={'primary'}>
              Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
