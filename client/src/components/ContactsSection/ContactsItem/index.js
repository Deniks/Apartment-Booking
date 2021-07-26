import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  details: {
    flex: 1,
  },
  detailsItem1: {
    marginBottom: 0,
    fontSize: '16px',
  },
  icon: {
    fontSize: '27px',
    marginRight: '20px',
  },
}));
export const ContactsItem = ({ icon, value, helperText }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.details}>
        <h3 className={classes.detailsItem1}>{value}</h3>
        <div>{helperText}</div>
      </div>
    </div>
  );
};
