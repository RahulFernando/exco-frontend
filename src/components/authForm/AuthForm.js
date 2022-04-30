import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// components
import InputField from '../inputField/InputField';
import Button from '../button/Button';

// actions
import { loginStart, loginReset } from '../../reducers/user-slice';
import { setDialog } from '../../reducers/ui-slice';

// selector
import { userSelector } from '../../selectors/user-selector';

// context
import AuthContext from '../../context/auth-context';

const AuthForm = () => {
  const dispatch = useDispatch();
  const context = useContext(AuthContext);

  const loginData = useSelector(userSelector);

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      user_name: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      user_name: Yup.string().required('User name is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      dispatch(loginStart(values));
    },
  });

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (loginData.data) {
      context.login(loginData.data.user_name, loginData.data.token);
      dispatch(setDialog(false));
      dispatch(loginReset());
    }
  }, [context, dispatch, loginData.data]);


  const usernameError = formik.errors.user_name && formik.touched.user_name;
  const passwordError = formik.errors.password && formik.touched.password;

  const userNameHelperText =
    formik.errors.user_name &&
    formik.touched.user_name &&
    formik.errors.user_name;

  const passwordHelperText =
    formik.errors.password && formik.touched.password && formik.errors.password;

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField
            name="user_name"
            label="User name"
            value={formik.values.user_name}
            error={usernameError}
            helperText={userNameHelperText}
            fullWidth
            required
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name="password"
            label="Password"
            value={formik.values.password}
            error={passwordError}
            helperText={passwordHelperText}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showPasswordHandler}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          <Button label="Login" type="submit" />
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthForm;
