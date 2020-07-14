import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import errorSVG from '../../assets/svg/error-404-colour.svg';

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(5),
  },
  svg: {
    marginTop: theme.spacing(5),

    width: 250,
    height: 250,
  },
}));

export const ErrorSection = () => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <h1 className={classes.paragraph}>The page was not found!</h1>
      <img className={classes.svg} src={errorSVG} alt="error ilustration" />
    </section>
  );
};
