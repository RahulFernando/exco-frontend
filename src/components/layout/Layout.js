import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../navbar/Navbar';
import Lending from '../../pages/lending/Lending';
import { Route, Routes } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// actions
import { setSnackbar } from '../../reducers/ui-slice';

// selector
import { snackbarSelector } from '../../reducers/ui-selector';

const routes = [
  {
    id: 'r1',
    path: '/',
    element: <Lending />,
  },
  {
    id: 'r1',
    path: '/lending',
    element: <Lending />,
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Layout = () => {
  const dispatch = useDispatch();

  const snackbar = useSelector(snackbarSelector);

  const closeHandler = () => {
    dispatch(setSnackbar({ open: false, message: '' }));
  };

  const severity = snackbar.success ? 'success' : 'error'

  return (
    <>
      <Navbar />
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
