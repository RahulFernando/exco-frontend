import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';

import BookCard from '../../components/bookCard/BookCard';

// actions
import { fetchReferenceStart } from '../../reducers/reference-slice';

// selectors
import {
  referenceDataSelector,
  referenceLoadingSelector,
} from '../../selectors/reference-selector';

const Reference = () => {
  const dispatch = useDispatch();

  const references = useSelector(referenceDataSelector);
  const loading = useSelector(referenceLoadingSelector);

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
        <BookCard title={book.name} img={book.img} />
      </Grid>
    ))}
  </Grid>
  );
};

export default Reference;
