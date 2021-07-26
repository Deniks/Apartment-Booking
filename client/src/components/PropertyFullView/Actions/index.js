import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Calendar } from '../../Calendar';

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(25),
    position: 'sticky',
  },
  buttonContainer: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  bookButton: {
    width: '100%',
  },
}));

export const Actions = ({ calendar }) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState([null, null]);

  const handleDate = (value) => {
    setSelectedDate(value);
  };

  useEffect(() => {
    if (calendar) {
      setSelectedDate(calendar);
    }
  }, [calendar]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Add dates for prices
        </Typography>
        <Calendar value={selectedDate} onChange={handleDate} calendars={2} />
      </CardContent>
      <CardActions>
        <Button className={classes.bookButton} variant="outlined" size="small">
          Check Availability
        </Button>
      </CardActions>
    </Card>
  );
};
