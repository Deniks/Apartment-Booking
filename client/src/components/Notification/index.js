import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
export const Notification = ({ open, setOpen, status }) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen({ open: false });
  };

  const content =
    status === 'success'
      ? 'Apartment is booked!'
      : status === 'error'
      ? 'Please lookup your data.'
      : null;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={status}>
        {content}
      </Alert>
    </Snackbar>
  );
};
