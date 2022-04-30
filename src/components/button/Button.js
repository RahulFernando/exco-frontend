import React from 'react';
import PropTypes from 'prop-types';
import { Button as MaterialButton } from '@mui/material';

const Button = ({ label, width, onClick, ...props }) => {
  return (
    <MaterialButton
      sx={{ width: width, textTransform: 'none' }}
      variant="contained"
      onClick={onClick}
      {...props}
    >
      {label}
    </MaterialButton>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  width: '200px',
  onClick: () => {},
};

export default Button;
