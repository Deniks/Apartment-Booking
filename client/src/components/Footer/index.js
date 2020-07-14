import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingBottom: 0,
  },
  root: {},
  footerContainer: {
    padding: '50px 105px 50px 105px',
    textAlign: 'center',
    color: '#919191',

    [theme.breakpoints.up('xs')]: {
      padding: '20px 0 20px 0',
    },
  },
  linkList: {
    listStyle: 'none',
  },
  link: {
    color: '#919191',
    fontSize: '13px',
    lineHeight: '42px',
    '&:hover': {
      color: 'red',
    },
  },
  contactInformation: {
    textAlign: 'left',
    marginBottom: '20px',
    padding: 0,
  },
}));

const props = (prevProps, nextProps) => true;

export const Footer = memo(() => {
  const classes = useStyles();
  return (
    <section className={classes.footer}>
      <Grid container spacing={3} justify="center">
        <Grid item md={6} sm={6} xs={12}>
          <h3>Alternative Choice Apartments</h3>
          <p className={classes.contactInformation}>
            <Link>conbusi@support.com</Link>
            <br />
            +10 873 672 6782
            <br />
            600/D, Green road, NewYork
          </p>

          <IconButton aria-label="twitter">
            <i className="fab fa-twitter"></i>
          </IconButton>

          <IconButton aria-label="facebook">
            <i className="fab fa-facebook-f"></i>
          </IconButton>
          <IconButton aria-label="instagram">
            <i className="fab fa-instagram"></i>
          </IconButton>
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <h3>Useful links</h3>
          <ul className={classes.linkList}>
            <li className={classes.link}>
              <Link href="#">Dispute Resolution Center</Link>
            </li>
            <li className={classes.link}>
              <Link href="#">privacy & policy</Link>
            </li>
            <li className={classes.link}>
              <Link href="#">Complaint Book</Link>
            </li>
          </ul>
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <h3>Other Services</h3>
          <ul className={classes.linkList}>
            <li className={classes.link}>
              <Link href="#">Alternative Choice Investments</Link>
            </li>
            <li className={classes.link}>
              <Link href="#">Tracas E Cupalas</Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Box className={classes.footerContainer}>
            <div className="footer-copyright">
              <div className="container">
                Copyright ©2020 All rights reserved | This template is made with
                by Deniss
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
}, props);
