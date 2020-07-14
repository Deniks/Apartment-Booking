import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Dots from 'material-ui-dots';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  navigation: {
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  dots: {
    height: 48,
    position: 'absolute',
    margin: '0 auto',
  },
  expandButton: {
    marginLeft: 'auto',
    color: '#fff',
    fontSize: 15,
  },
}));

const modulo = (a, n) => ((a % n) + n) % n;

export const CarouselNavigation = ({
  childrenLength,
  slideIndex,
  handleDotClick,
  handleFullScreenClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.navigation}>
      <Dots
        className={classes.dots}
        index={modulo(slideIndex, childrenLength)}
        count={childrenLength}
        onDotClick={handleDotClick}
      />
      <IconButton
        className={classes.expandButton}
        onClick={handleFullScreenClick}
        aria-label="expand"
      >
        <i class="fas fa-expand"></i>
      </IconButton>
    </div>
  );
};
