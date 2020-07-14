import React, { useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  burger: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  drawer: {
    width: '500px',
  },
}));

export const MobileNavigation = () => {
  const burger = useRef(null);

  const [drawer, setDrawer] = useState(false);

  const listProps = useSpring({
    transform: drawer ? 'translate3d(0%, 0, 0)' : 'translate3d(-250%, 0, 0)',
    delay: 100,
  });
  const classes = useStyles();

  const toggleMenu = (state) => {
    setDrawer(state);
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        anchor={'right'}
        open={drawer}
        onClose={() => toggleMenu(false)}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => toggleMenu(false)}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <animated.div style={listProps}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <i className="fas fa-home"></i>
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <i className="fas fa-building"></i>
              </ListItemIcon>
              <ListItemText primary={'Apartments'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <i className="far fa-address-card"></i>{' '}
              </ListItemIcon>
              <ListItemText primary={'About Us'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <i className="fas fa-phone"></i>{' '}
              </ListItemIcon>
              <ListItemText primary={'Contact us'} />
            </ListItem>
          </List>
        </animated.div>
      </Drawer>
      <div
        ref={burger}
        id="burger"
        className={`${classes.burger} burger burger-rotate`}
      >
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => toggleMenu(true)}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </>
  );
};
