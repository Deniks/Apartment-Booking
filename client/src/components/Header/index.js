import React, { useEffect, useState, useRef, memo, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Navigation } from '../Navigation';
import { TopHeader } from '../TopHeader';

import './style.css';
import { MobileNavigation } from '../MobileNavigation';
const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  appBar: ({ appBarActive, changeColor }) => ({
    transition: 'background 100ms ease, transform 300ms ease-in-out',
    background: changeColor ? theme.palette.primary.dark : 'transparent',
    position: appBarActive ? 'fixed' : 'absolute',
    top: appBarActive ? -40 : 'auto',
    transform: appBarActive ? 'translateY(40px)' : 'translateY(0px)',
  }),
}));

export const Header = () => {
  const [appBarActive, setAppBarActive] = useState(false);
  let { pathname } = useLocation();
  const [changeColor, setColor] = useState(false);
  const appBar = useRef();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles({
    appBarActive,
    changeColor,
  });

  const handleScroll = useCallback(() => {
    setAppBarActive(window.scrollY >= 300 ? true : false);
    setColor(
      window.scrollY >= 300
        ? true
        : pathname === '/' || pathname.match(/\/apartments\/.*/)
        ? false
        : true
    );
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/' || pathname.match(/\/apartments\/.*/)) {
      setColor(false);
    } else {
      setColor(true);
    }
    window.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    });
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [appBarActive, handleScroll, pathname]);

  return (
    <div className="header-area">
      <TopHeader />
      <AppBar ref={appBar} className={`${classes.appBar} navigation-bar`}>
        <Toolbar>
          <Typography className="title" variant="h6">
            <Link to="/">Alternative Apartments</Link>
          </Typography>
          {mobile ? (
            <MobileNavigation
              root={appBar}
              rootColor={changeColor}
              location={pathname}
              setColor={setColor}
            />
          ) : (
            <Navigation />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
