import React, { useContext, useEffect, useState, useRef } from 'react';

import { MatchContext } from '../../pages/SingleApartmentPage';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';

import { PropertyFullView } from '../PropertyFullView';
import { GET_APARTMENT } from './graphql';
import { images } from '../../global/apartments_detail/images';

import Container from '@material-ui/core/Container';
import { Hero } from './Hero';

const useStyles = makeStyles((theme) => ({
  section: {
    paddingTop: 100,
  },
}));

export const SingleApartmentSection = () => {
  const classes = useStyles();
  const { params } = useContext(MatchContext);
  const root = useRef();

  const { loading, error, data } = useQuery(GET_APARTMENT, {
    variables: { apartmentName: params.apartment },
  });

  return (
    <>
      <Hero
        headline={params.apartment}
        apartmentData={data ? data.apartment : {}}
        image={images[params.apartment][0]}
      />

      <Container className={classes.section} ref={root}>
        {loading ? (
          `loading`
        ) : error ? (
          `error`
        ) : (
          <PropertyFullView
            root={root}
            apartmentInformation={data.apartment}
            images={images[params.apartment]}
          />
        )}
      </Container>
    </>
  );
};
