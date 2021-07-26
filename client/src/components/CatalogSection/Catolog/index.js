import React, { useState, useRef } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Skeleton from '@material-ui/lab/Skeleton';

import { PropertyCard } from '../../ProperyCard';

const useStyles = makeStyles((theme) => ({
  skeltonBox: {
    margin: '0 auto',
    maxWidth: 330,
    maxHeight: 420,
  },
}));

export const Catalog = ({ apartments, container }) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const [expand, set] = useState({
    state: false,
    index: null,
  });

  return apartments.map((apartment, i) => {
    let order = i;

    // wrong
    const max = (i + 1) % 3 === 0;
    const middle = max ? i - 1 : false;
    const low = max ? i - 1 : false;
    // till here

    if (expand.state) {
      // Clicked Card
      if (expand.index === i) {
        if (max || middle) {
          order = 1;
        }

        console.log('touched ', order);
      }

      // Unclicked Cards
      if (expand.index === i - 1) {
        console.log('another');
      }
    }

    return (
      <Grid
        key={i}
        md={expand.state && expand.index === i ? 12 : 4}
        sm={expand.state && expand.index === i ? 12 : 6}
        xs={12}
        item
        style={{
          order,
          height:
            expand.state && expand.index === i
              ? sm
                ? '1100px'
                : 'auto'
              : 'auto',
        }}
      >
        {apartment ? (
          <PropertyCard
            name={apartment.name}
            price={apartment.price}
            bedrooms={apartment.bedrooms}
            bathrooms={apartment.bathrooms}
            size={apartment.size}
            garage={apartment.garage}
            description={apartment.description}
            features={apartment.features}
            address={apartment.address}
            expand={expand}
            set={set}
            index={i}
            containerRef={container.current}
            sm={sm}
            xs={xs}
          />
        ) : (
          <Box className={classes.skeltonBox}>
            <Skeleton variant="rect" width="100%" height={190} />
            <Skeleton width="40%" />
            <Skeleton width="40%" />
            <Skeleton width="100%" />
          </Box>
        )}
      </Grid>
    );
  });
};
