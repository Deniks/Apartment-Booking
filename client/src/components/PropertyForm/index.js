import React from 'react';

import { useSpring, config, animated } from 'react-spring';

import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Container from '@material-ui/core/Container';

import { Calendar } from '../Calendar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './style.css';

import { bedrooms as bedrooms_data, marks } from './seed';

const useStyles = makeStyles((theme) => ({
  propertyForm: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    bottom: 250,
    marginBottom: -100,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '0 40px',
      bottom: 180,
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 25px',
      bottom: 100,
    },
  },
  gridContainer: {
    background: 'rgba(0, 28, 56, 0.6)',
    boxShadow: `0 1px 1px rgba(0,0,0,0.12), 
              0 2px 2px rgba(0,0,0,0.12), 
              0 4px 4px rgba(0,0,0,0.12), 
              0 8px 8px rgba(0,0,0,0.12),
              0 16px 16px rgba(0,0,0,0.12)`,
    borderRadius: 10,
    [theme.breakpoints.down('xs')]: {
      background: 'rgba(0, 28, 56, 0.9)',
    },
  },
  inputContainer: {
    textAlign: 'center',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  input: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  slider: {
    color: '#fdae5c',
    paddingTop: '30px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  dateRangeDelimiter: {
    color: '#fdae5c',
    [theme.breakpoints.down('xs')]: {
      marginTop: 20,
    },
  },
  searchBtn: {
    justifyContent: 'center',
  },
}));

export const ProperyForm = ({
  bedrooms,
  handleBedroomChange,
  price,
  handlePriceChange,
  selectedDate,
  handleDateChange,
  handleSearch,
}) => {
  const classes = useStyles();

  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(100px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 1000,
  });

  return (
    <animated.div style={props}>
      <Container className={classes.propertyForm}>
        <form autoComplete="off">
          <Grid
            alignItems="center"
            className={classes.gridContainer}
            container
            spacing={5}
          >
            <Grid item lg={2} md={2} sm={2} xs={12}>
              <Grid item className={classes.inputContainer}>
                <FormLabel>Bedrooms</FormLabel>
                <TextField
                  select
                  margin="dense"
                  label="Select"
                  className={classes.input}
                  value={bedrooms}
                  onChange={handleBedroomChange}
                  variant="outlined"
                >
                  {bedrooms_data.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <Grid className={classes.inputContainer} item>
                <FormLabel>Price</FormLabel>
                <Slider
                  value={price}
                  className={classes.slider}
                  onChange={handlePriceChange}
                  aria-labelledby="range-slider"
                  valueLabelDisplay="auto"
                  min={30}
                  max={300}
                />
              </Grid>
            </Grid>

            <Grid item lg={5} md={5} sm={6} xs={12}>
              <Grid className={classes.inputContainer} item>
                <FormLabel>Calendar</FormLabel>
                <Calendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  inputStyle={classes.input}
                  delimiterStyle={classes.dateRangeDelimiter}
                />
              </Grid>
            </Grid>

            <Grid item lg={2} md={2} sm={12} xs={12}>
              <Grid className={classes.inputContainer} item>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SearchIcon />}
                  onClick={handleSearch}
                >
                  {' '}
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </animated.div>
  );
};
