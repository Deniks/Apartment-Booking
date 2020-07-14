import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useSpring, config, animated } from 'react-spring';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  box: {
    background: '#ffee58',
  },
  container: {
    padding: '30px 0',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: '30px 10px',
    },
  },
  closeButton: {
    marginTop: theme.spacing(1),
  },
}));

export const CookieWarning = ({ style, reference, handleClose }) => {
  const classes = useStyles();

  return (
    <animated.div ref={reference} style={style}>
      <Box component="div" className={classes.box}>
        <Container maxWidth="sm" className={classes.container}>
          <Typography variant="body1" component="p">
            This site uses cookies to allow you to change the language and store
            your favorite properties. By using this site, you agree that it uses
            cookies.
          </Typography>
          <Button
            onClick={handleClose}
            className={classes.closeButton}
            variant="outlined"
          >
            I Understand
          </Button>
        </Container>
      </Box>
    </animated.div>
  );
};
