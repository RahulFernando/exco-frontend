import React, { useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import Navbar from '../navbar/Navbar';
import Reference from '../../pages/reference/Reference';
import Lending from '../../pages/lending/Lending';
import Dialog from '../dialog/Dialog';
import AuthForm from '../authForm/AuthForm';
import Cart from '../cart/Cart';

// actions
import { setSnackbar } from '../../reducers/ui-slice';
import { addToCartReset, getCartStart } from '../../reducers/cart-slice';

// selector
import { snackbarSelector, dialogSelector } from '../../selectors/ui-selector';
import { addToCartSelector } from '../../selectors/cart-selector';

// context
import AuthContext from '../../context/auth-context';

// utils
import { getUserDetails } from '../../helpers/util';

const routes = [
  {
    id: 'r1',
    path: '/',
    element: <Lending />,
  },
  {
    id: 'r1',
    path: '/lendings',
    element: <Lending />,
  },
  {
    id: 'r1',
    path: '/references',
    element: <Reference />,
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Layout = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const snackbar = useSelector(snackbarSelector);
  const dialog = useSelector(dialogSelector);
  const cart = useSelector(addToCartSelector);

  const closeHandler = () => {
    dispatch(setSnackbar({ open: false, message: '' }));
  };
  
  const fetchCart = useCallback(async () => {
    const { user_id } = await getUserDetails(user.token);
    dispatch(getCartStart(user_id));
  }, [dispatch, user.token])

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (cart.data) {
      fetchCart()
      dispatch(addToCartReset());
    }
  }, [cart, dispatch, fetchCart])

  const severity = snackbar.success ? 'success' : 'error';

  return (
    <>
      <Navbar />
      <Dialog title="Login">
        {dialog.type === 'LOGIN' ? <AuthForm /> : <Cart />}
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeHandler}
      >
        <Alert
          onClose={closeHandler}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <div>
        <Routes>
          {routes.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default Layout;
