import React, { useEffect, useRef } from 'react';

import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

import { useSpring, config, animated } from 'react-spring';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import BathtubIcon from '@material-ui/icons/Bathtub';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import HotelIcon from '@material-ui/icons/Hotel';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HeightIcon from '@material-ui/icons/Height';

const useStyles = makeStyles((theme) => ({
  hero: {
    position: 'relative',
    '-webkit-box-pack': 'center',
    '-ms-flex-pack': 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    color: '#fff',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    scrollSnapAlign: 'start',
    padding: '95px 25vw',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      padding: '95px 200px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '95px 150px',
    },
  },
  backgroundImage: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    '-o - object - fit': 'cover',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    zIndex: -1,
    filter: 'brightness(65%)',
  },
  headline: {
    fontSize: 44,
    fontWeight: 600,
    marginBottom: 20,
  },
  apartmentPropertiesContainer: {
    background: 'rgba(28, 28, 28, 0.6)',
    padding: '30px 8vw',
    textAlign: 'center',
    color: '#fff',
    [theme.breakpoints.down('md')]: {
      padding: '30px 100px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '30px 30px',
    },
  },
  property: {
    color: '#fff',
  },
  specialProperty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 0',
  },
}));

const calc = (o, init) => `translateY(${o * init}px)`;

export const Hero = ({
  headline,
  loading,
  apartmentData: {
    price = 25,
    location = '9721 Glen Creek Ave. Ballston Spa, NY',
    size = 25,
    bedrooms = 2,
    bathrooms = 1,
    garage = 1,
  },
  image,
}) => {
  const classes = useStyles();
  const root = useRef();
  const [{ offset: imageOffset }, setImageOffset] = useSpring(() => ({
    to: { offset: 0 },
    config: config.slow,
  }));

  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(100px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 1000,
  });

  const handleScroll = () => {
    const posY = root.current.getBoundingClientRect().top;
    const offset = window.pageYOffset - posY;
    setImageOffset({ offset });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <Box ref={root} className={classes.hero}>
      <Container className={classes.apartmentPropertiesContainer}>
        <animated.div style={props}>
          <Box className={classes.specialProperty}>
            <LocationOnIcon />

            <Typography
              className={classes.property}
              style={{ color: '#aaaab3' }}
              component="p"
            >
              {location}
            </Typography>
          </Box>
          <Typography component="h1" variant="h3" className={classes.headline}>
            {headline}
          </Typography>
          <Box className={classes.specialProperty}>
            <Typography
              style={{ color: '#aaaab3' }}
              className={classes.property}
              component="p"
            >
              Price:
            </Typography>
            <Typography
              style={{ fontWeight: 600, marginLeft: 10, fontSize: 20 }}
              className={classes.property}
              component="p"
            >
              {price}€
            </Typography>
          </Box>

          <Grid container justify="center" alignItems="center">
            <Grid item xs={3}>
              <HeightIcon />
              <Typography className={classes.property} component="p">
                {size}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <HotelIcon />
              <Typography className={classes.property} component="p">
                {bedrooms}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <BathtubIcon />
              <Typography className={classes.property} component="p">
                {bathrooms}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <DirectionsCarIcon />
              <Typography className={classes.property} component="p">
                {garage}
              </Typography>
            </Grid>
          </Grid>
        </animated.div>
      </Container>
      <animated.div
        style={{
          transform: imageOffset.interpolate((o) => calc(o, 0.05)),
        }}
        className={classes.backgroundImage}
      >
        <img
          src={image}
          alt="main property"
          style={{ transform: 'scale(1.1)', width: '100%' }}
        />
      </animated.div>
    </Box>
  );
};
