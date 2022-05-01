import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Dialog from '../dialog/Dialog';
import CartItem from './CartItem';

// context
import AuthContext from '../../context/auth-context';

// actions
import { getCartStart } from '../../reducers/cart-slice';

// selectors
import { cartSelector } from '../../selectors/cart-selector';

// utils
import { getUserDetails } from '../../helpers/util';
import { Grid, Typography } from '@mui/material';

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const cart = useSelector(cartSelector);

  useEffect(() => {
    const fetchCart = async () => {
      const { user_id } = await getUserDetails(user.token);
      dispatch(getCartStart(Number(user_id)));
    };

    fetchCart();
  }, [dispatch, user.token]);

  return (
    <Dialog title="Cart">
      {cart.data?.items.length > 0 &&
        cart.data.items.map((item) => <CartItem key={item.id} item={item} />)}
      {(cart.data?.items.length === 0 || cart.error) && (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">No items</Typography>
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
};

export default Cart;
