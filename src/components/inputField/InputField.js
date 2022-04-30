import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const InputField = ({ name, label, error, helperText, value, onChange, ...props }) => {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
      {...props}
    />
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  error: false,
  helperText: '',
};

export default InputField;
