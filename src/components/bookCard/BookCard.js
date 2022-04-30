import React from 'react';
import PropTypes from 'prop-types';
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';

import Button from '../button/Button';

const BookCard = ({ img, title }) => {
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
        <Button label="Book" />
      </CardActions>
    </Card>
  );
};

BookCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BookCard;
