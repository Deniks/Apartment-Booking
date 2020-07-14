import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useSpring, animated } from 'react-spring';

import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },

  buttonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export const StatusButton = ({ state, text = 'Send' }) => {
  const classes = useStyles();

  const props = useSpring({
    opacity: state === 'success' ? 1 : 0,
  });

  return (
    <div className={classes.buttonWrapper}>
      <Button
        type="submit"
        disabled={state === 'loading'}
        color="primary"
        className={classes.button}
      >
        {state === 'success' ? (
          <animated.div style={props}>
            <CheckIcon />
          </animated.div>
        ) : (
          text
        )}
      </Button>
      {state === 'loading' && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};
