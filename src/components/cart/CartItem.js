import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

// context
import AuthContext from '../../context/auth-context';

// util
import { daysRemains } from '../../helpers/util';

const useStyles = makeStyles({
  image: {
    width: '100%',
  },
});

const CartItem = ({ item }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [overdue, setOverdue] = useState();

  let content = (
    <Grid item xs={12}>
      <Alert severity="error">Overdue!</Alert>
    </Grid>
  );

  const fetchUserDetails = useCallback(async () => {
    // if user is student and book lending
    if (user.user_role === 'student' && item.type === 1) {
      const from = new Date(item.date);
      const to = new Date().setDate(from.getDate() + 14);

      setOverdue(daysRemains(from, to));
    }

    // if user is student and book reference
    if (user.user_role === 'student' && item.type === 0) {
      const from = new Date(item.date);
      const to = new Date().setDate(from.getDate() + 1);

      setOverdue(daysRemains(from, to));
    }

    // if user is faculty member and book lending
    if (user.user_role === 'faculty_member' && item.type === 1) {
      const from = new Date(item.date);
      const to = new Date().setDate(from.getDate() + 30);

      setOverdue(daysRemains(from, to));
    }

    // if user is faculty member and book reference
    if (user.user_role === 'faculty_member' && item.type === 0) {
      const from = new Date(item.date);
      const to = new Date().setDate(from.getDate() + 3);

      setOverdue(daysRemains(from, to));
    }
  }, [item.date, item.type, user]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  useEffect(() => {
    const id = setTimeout(() => {
      fetchUserDetails();
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [fetchUserDetails, item, overdue]);

  if (overdue?.days !== 0 && overdue?.hours !== 0) {
    content = (
      <>
        <Grid item xs={3}>
          <Typography variant="subtitle1">Overdue by</Typography>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={4}>
          <Typography variant="subtitle1">{`${overdue?.days} days ${overdue?.hours} hours`}</Typography>
        </Grid>
      </>
    );
  }

  return (
    <Grid container>
      <Grid item xs={3}>
        <img className={classes.image} src={item.img} alt="book" />
      </Grid>
      <Grid item xs={9} pl={2}>
        <Typography variant="h6">{item.name}</Typography>
        <Grid container item xs={12} pt={2} spacing={2}>
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
