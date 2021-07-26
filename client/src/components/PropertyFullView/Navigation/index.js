import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'sticky',
    bottom: 0,
  },
});

export const Navigation = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Gallery" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Description" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
};
