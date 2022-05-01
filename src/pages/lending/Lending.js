import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';

// components
import BookCard from '../../components/bookCard/BookCard';

// context
import AuthContext from '../../context/auth-context';

// actions
import { fetchLendingStart } from '../../reducers/lending-slice';
import { addToCartStart } from '../../reducers/cart-slice';
import { setSnackbar } from '../../reducers/ui-slice';

// selectors
import {
  lendingDataSelector,
  lendingLoadingSelector,
} from '../../selectors/lending-selector';
import { cartSelector } from '../../selectors/cart-selector';

// util
import { getUserDetails, getCount } from '../../helpers/util';

const Lending = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const lendings = useSelector(lendingDataSelector);
  const loading = useSelector(lendingLoadingSelector);
  const cart = useSelector(cartSelector);

  const setError = () => {
    dispatch(
      setSnackbar({
        open: true,
        success: false,
        message: 'No of lendings you can borrow is exceeded!',
      })
    );
  };

  const bookHandler = async (book) => {
    const { user_id, user_role } = await getUserDetails(user.token);

    // if no of items exceeds
    if (getCount(cart, 1) >= 3 && user_role === 'student') {
      setError();
      return;
    }

    if (getCount(cart, 1) >= 6 && user_role === 'faculty_member') {
      setError();
      return;
    }

    const obj = {
      userid: Number(user_id),
      items: [{ name: book.name, type: 1, img: book.img, date: new Date() }],
    };
    dispatch(addToCartStart(obj));
  };

  useEffect(() => {
    dispatch(fetchLendingStart());
  }, [dispatch]);

  return (
    <Grid container spacing={2} p={2}>
      {loading && (
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          <CircularProgress />
        </Grid>
      )}
      {lendings.map((book) => (
        <Grid key={book.id} item md={3} xs={6}>
          <BookCard
            title={book.name}
            img={book.img}
            onClick={bookHandler.bind(null, book)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Lending;
