import React from 'react';

import warningSVG from '../../assets/svg/undraw_notify_88a4.svg';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap-reverse',
      padding: 30,
    },
  },
  svg: {
    maxWidth: '100%',
    width: 400,
  },
}));

export const ErrorMessage = ({ src }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="p">
        {src}
      </Typography>
      <img src={warningSVG} className={classes.svg} alt="warning svg" />
    </Box>
  );
};
