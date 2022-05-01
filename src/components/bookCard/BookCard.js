import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';

// components
import Button from '../button/Button';

// actions
import { setDialog } from '../../reducers/ui-slice';

import AuthContext from '../../context/auth-context';

const BookCard = ({ img, title, onClick }) => {
  const dispatch = useDispatch()
  const { user } = useContext(AuthContext);

  const bookClickHandler = () => {
    if (!user.token) {
      dispatch(setDialog({ open: true }));
      return;
    }

    onClick();
  }

  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardMedia
        component="img"
        image={img}
        alt={title}
        height="200"
        style={{
          width: 'auto',
          margin: 'auto'
        }}
      />
      <CardContent>
        <Typography textAlign='center' gutterBottom variant="h6" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button label="Book" onClick={bookClickHandler} />
      </CardActions>
    </Card>
  );
};

BookCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BookCard;
