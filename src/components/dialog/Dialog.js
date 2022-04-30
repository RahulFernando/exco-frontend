import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Dialog as MaterialDialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { setDialog } from '../../reducers/ui-slice';

// selectors
import { dialogSelector } from '../../selectors/ui-selector';

const BootstrapDialog = styled(MaterialDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Dialog = ({ title, children }) => {
  const dispatch = useDispatch();

  const open = useSelector(dialogSelector);

  const closeHandler = () => {
    dispatch(setDialog(false));
  };

  return (
    <BootstrapDialog open={open} onClose={closeHandler}>
      <BootstrapDialogTitle onClose={closeHandler}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </BootstrapDialog>
  );
};

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Dialog;
