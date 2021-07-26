import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { animated } from 'react-spring';
import Markdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  contentItem: {
    '& > p': {
      fontSize: theme.typography.pxToRem(15),
      textAlign: 'left',
      padding: 0,
      marginBottom: 0,
    },
  },
}));

export const Features = ({ content }) => {
  const classes = useStyles();

  const AnimatedTypography = animated(Typography);

  return (
    <>
      <div className={classes.content}>
        <AnimatedTypography
          className={classes.contentItem}
          color="textSecondary"
          variant="body2"
          component="span"
        >
          <Markdown escapeHTML source={content} />
        </AnimatedTypography>
      </div>
    </>
  );
};
