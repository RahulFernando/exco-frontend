import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';

import BookCard from '../../components/bookCard/BookCard';

// actions
import { fetchLendingStart } from '../../reducers/lending-slice';

// selectors
import {
  lendingDataSelector,
  lendingLoadingSelector,
} from '../../selectors/lending-selector';

const Lending = () => {
  const dispatch = useDispatch();

  const lendings = useSelector(lendingDataSelector);
  const loading = useSelector(lendingLoadingSelector);

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
          <BookCard title={book.name} img={book.img} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Lending;
