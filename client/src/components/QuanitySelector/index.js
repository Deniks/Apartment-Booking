import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
  },
}));

const Label = ({ children, src }) => (
  <FormControlLabel control={children} label={src} labelPlacement="start" />
);

export const QuanitySelector = ({ min, max, init, label, boxStyle = {} }) => {
  const classes = useStyles();
  const [counter, setCounter] = useState(init);

  const handleIncrement = () => {
    const newValue = counter + 1;

    if (max >= newValue) {
      setCounter(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = counter - 1;
    if (min <= newValue) {
      setCounter(newValue);
    }
  };

  return (
    <Label src={label}>
      <Box className={classes.box} style={boxStyle}>
        <Button disabled>{counter}</Button>

        <ButtonGroup
          orientation="vertical"
          size="small"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="text"
          id="quanity-selector"
        >
          <Button disabled={counter === max} onClick={handleIncrement}>
            +
          </Button>
          <Button disabled={counter === min} onClick={handleDecrement}>
            -
          </Button>
        </ButtonGroup>
      </Box>
    </Label>
  );
};
