import React, { useState, useRef, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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

  dropdown: ({ height }) => ({
    width: '100vw',
    left: 0,
    top: height,
    height: 'auto',
    position: 'absolute',
    background: theme.palette.primary.dark,
  }),

  list: {
    display: 'block !important',
    alignItems: 'center',
    width: 200,
    margin: '16px 0 auto 0px',
    padding: theme.spacing(0, 1, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

export const MobileNavigation = ({ root, rootColor, location, setColor }) => {
  const [dropdown, setDropDown] = useState(false);
  const { height } = root.current.getBoundingClientRect();

  const listProps = useSpring({
    opacity: dropdown ? 1 : 0,
    transform: dropdown ? 'translate3d(0%, 0, 0)' : 'translate3d(-150%, 0, 0)',
    delay: 100,
  });

  const dropdownProps = useSpring({
    transform: dropdown ? 'translate3d(0%, 0, 0)' : 'translate3d(-100%, 0, 0)',
  });

  const classes = useStyles({ height });

  const toggleMenu = () => {
    setDropDown(!dropdown);
    if (
      window.scrollY < 300 &&
      (location === '/' || location.match(/\/apartments\/.*/))
    ) {
      setColor(!rootColor);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', () => setDropDown(false), {
      passive: true,
    });
    return window.removeEventListener('scroll', () => setDropDown(false));
  }, []);
  return (
    <>
      <animated.div className={classes.dropdown} style={dropdownProps}>
        <animated.div style={listProps}>
          <List className={classes.list}>
            <ListItem button component="a" href="/">
              <ListItemIcon className={classes.icon}>
                <i className="fas fa-home"></i>
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem button component="a" href="/apartments">
              <ListItemIcon className={classes.icon}>
                <i className="fas fa-building"></i>
              </ListItemIcon>
              <ListItemText primary={'Apartments'} />
            </ListItem>
            <ListItem button component="a" href="/about-us">
              <ListItemIcon className={classes.icon}>
                <i className="far fa-address-card"></i>{' '}
              </ListItemIcon>
              <ListItemText primary={'About Us'} />
            </ListItem>
            <ListItem button component="a" href="/contacts">
              <ListItemIcon className={classes.icon}>
                <i className="fas fa-phone"></i>{' '}
              </ListItemIcon>
              <ListItemText primary={'Contacts'} />
            </ListItem>
          </List>
        </animated.div>
      </animated.div>
      <div className={classes.burger}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </>
  );
};
