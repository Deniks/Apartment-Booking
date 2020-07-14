import React, { useEffect, useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { animated, useSpring } from 'react-spring';

import Grid from '@material-ui/core/Grid';
import { Gallery } from './Gallery';
import { Actions } from './Actions';
import { Calendar } from '../Calendar';

const useStyles = makeStyles((theme) => ({}));

const calc = (o) => `translateY(${o * 0.01}px)`;

export const PropertyFullView = ({ root, apartmentInformation, images }) => {
  const classes = useStyles();
  const {
    price,
    bedrooms,
    bathrooms,
    size,
    description,
    features,
    address,
  } = apartmentInformation;
  const [calendar, setCalendar] = useState([null, null]);

  const handleCalendar = (value) => {
    setCalendar(value);
  };
  return (
    <>
      <Grid className={classes.root} container spacing={3}>
        <Grid item xs={12}>
          <Gallery images={images} />
        </Grid>
        <Grid item sm={8}>
          <Calendar
            variant="static"
            value={calendar}
            onChange={handleCalendar}
            calendars={2}
          />
        </Grid>
        <Grid item sm={4}>
          <Actions calendar={calendar} />
        </Grid>
      </Grid>
    </>
  );
};
