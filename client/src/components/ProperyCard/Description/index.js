import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { animated } from 'react-spring';
import Markdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  contentItem: {
    textAlign: 'left',
    paddingLeft: 0,
    '& > p': {
      fontSize: theme.typography.pxToRem(15),

      textAlign: 'left',
      padding: 0,
      marginBottom: 0,
    },
  },
  description: ({ expand }) => ({
    display: expand ? 'block' : 'none',
  }),
}));

export const Description = ({ open, content, name, price }) => {
  const classes = useStyles({ expand: open });

  const AnimatedTypography = animated(Typography);
  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        {name}
      </Typography>

      <div className={classes.content}>
        <AnimatedTypography
          className={`${classes.contentItem} ${classes.description}`}
          color="textSecondary"
          variant="body2"
          component="span"
        >
          <Markdown escapeHTML source={content} />
        </AnimatedTypography>
        {!open && (
          <>
            <Typography
              className={classes.contentItem}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {name} <i className="fa fa-map-marker-alt"></i>
            </Typography>

            <Typography
              className={classes.contentItem}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {price}$ / day <i className="fas fa-money-bill-wave"></i>
            </Typography>
          </>
        )}
      </div>
    </>
  );
};
