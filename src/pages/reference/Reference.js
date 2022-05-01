import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';

// context
import AuthContext from '../../context/auth-context';

// components
import BookCard from '../../components/bookCard/BookCard';

// actions
import { fetchReferenceStart } from '../../reducers/reference-slice';
import { addToCartStart } from '../../reducers/cart-slice';
import { setSnackbar } from '../../reducers/ui-slice';

// selectors
import {
  referenceDataSelector,
  referenceLoadingSelector,
} from '../../selectors/reference-selector';
import { cartSelector } from '../../selectors/cart-selector';

// util
import { getUserDetails, getCount } from '../../helpers/util';

const Reference = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const references = useSelector(referenceDataSelector);
  const loading = useSelector(referenceLoadingSelector);
  const cart = useSelector(cartSelector);

  const setError = () => {
    dispatch(
      setSnackbar({
        open: true,
        success: false,
        message: 'No of references you can borrow is exceeded!',
      })
    );
  };

  const bookHandler = async (book) => {
    const { user_id, user_role } = await getUserDetails(user.token);

    // if no of items exceeds
    if (getCount(cart) >= 2 && user_role === 'student') {
      setError();
      return;
    }

    if (getCount(cart) >= 4 && user_role === 'faculty_member') {
      setError()
      return;
    }

    const obj = {
      userid: Number(user_id),
      items: [{ name: book.name, type: 0, img: book.img, date: new Date() }],
    };
    dispatch(addToCartStart(obj));
  };

  useEffect(() => {
    dispatch(fetchReferenceStart());
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
      {references.map((book) => (
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

export default Reference;
