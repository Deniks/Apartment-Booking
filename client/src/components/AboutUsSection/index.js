import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import profileSVG from '../../assets/svg/undraw_relaxing_at_home_9tyc.svg';

const useStyles = makeStyles((theme) => ({
  svg: {
    width: 250,
    height: 250,
  },
  itemContainer: {
    textAlign: 'center',
  },
}));

const props = (prevProps, nextProps) => true;

export const AboutUsSection = memo(() => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <h1 className="title">About Us</h1>
      <Grid className={classes.root} container spacing={3}>
        <Grid lg={6} md={6} xs={12} item className={classes.itemContainer}>
          <img
            className={classes.svg}
            src={profileSVG}
            alt="profile ilustration"
          />
        </Grid>
        <Grid lg={6} md={6} xs={12} item>
          <p className={classes.paragraph}>
            Choice Investments, Serving your future Dear Investor, After more
            than 20 years working in Real Estate sales and marketing,
            development and construction business in Switzerland, USA, Spain and
            Portugal, I have opened a Broker Real Estate Business here in
            Portugal, "Choice Investments". Our team works in delivering unique
            services and Real Estate business throughout the country, especially
            in Lisbon and Porto. Once we understand the exact purpose of your
            approach, our large network
          </p>
        </Grid>
      </Grid>
    </section>
  );
}, props);
