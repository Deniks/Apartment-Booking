import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import './style.css';

const useStyles = makeStyles((theme) => ({
  topHeader: {
    padding: '0 105px 0 105px',
    background: '#001d38',
    maxHeight: '55px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 55px 8px 55px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 5px 8px 5px',
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  contactDetails: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '10px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },
  links: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const props = (prevProps, nextProps) => true;

export const TopHeader = memo(() => {
  const classes = useStyles();

  return (
    <Box
      component="div"
      className={`${classes.topHeader} header-top_area d-none d-lg-block`}
    >
      <Grid container>
        <Grid className={classes.title} lg={4} md={3} item>
          <div className="header_left">
            <p>Welcome to consulting service</p>
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={8} xs={12}>
          <div className={classes.contactDetails}>
            <div className="short_contact_list">
              <ul>
                <li>
                  <a href="/">
                    {' '}
                    <i className="fa fa-envelope"></i> info@docmed.com
                  </a>
                </li>
                <li>
                  <a href="/">
                    {' '}
                    <i className="fa fa-phone"></i> 1601-609 6780
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid className={classes.links} item lg={2} md={3} sm={4}>
          <div className="social_media_links">
            <a href="#">
              <i className="fab fa-linkedin-in"></i>{' '}
            </a>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}, props);
