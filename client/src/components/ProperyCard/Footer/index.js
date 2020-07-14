import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { animated } from 'react-spring';

import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  properties: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: 1,
  },
  buttonsWrapper: {
    marginLeft: 'auto',
  },
  buyBtn: {
    marginLeft: 'auto',
  },
  icon: {
    paddingRight: '5px !important',
  },
}));

export const Footer = ({
  bedrooms,
  bathrooms,
  size,
  garage,
  onViewBtnClick,
  onBookBtnClick,
  propertiesProps,
  open,
  buttonsProps,
}) => {
  const classes = useStyles({ expand: open });

  const AnimatedCardActions = animated(CardActions);

  return (
    <div className={classes.cardFooter}>
      <CardActions>
        <animated.div className={classes.buyBtn} style={buttonsProps}>
          <Button size="small" variant="outlined" onClick={onViewBtnClick}>
            {open ? 'Close' : 'Brief View'}
          </Button>
        </animated.div>
        <animated.div className={classes.buyBtn} style={buttonsProps}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onBookBtnClick}
          >
            Inquire Booking
          </Button>{' '}
        </animated.div>
      </CardActions>

      <Divider />

      <AnimatedCardActions disableSpacing style={propertiesProps}>
        <div className={classes.properties}>
          <Typography variant="body2" color="textSecondary" component="p">
            <i className="fas fa-fw fa-bed"></i>
            <span style={{ paddingLeft: '3px' }}>{bedrooms}</span>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <i className="fas fa-fw fa-bath"></i>
            <span>{bathrooms}</span>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <i className="fa fa-fw fa-expand"></i>{' '}
            <span>
              {size}m<sup>2</sup>
            </span>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <i className="fas fa-fw fa-car"></i> <span>{garage}</span>
          </Typography>
        </div>
      </AnimatedCardActions>
    </div>
  );
};
