import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  image: {
    width: '100%',
  },
});

const CartItem = ({ item }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={3}>
        <img className={classes.image} src={item.img} alt="book" />
      </Grid>
      <Grid item xs={9} pl={2}>
        <Typography variant="h6">{item.name}</Typography>
      </Grid>
    </Grid>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
