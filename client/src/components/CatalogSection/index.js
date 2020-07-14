import React, {
  useState,
  useEffect,
  useRef,
  memo,
  useContext,
  useCallback,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ErrorMessage } from '../ErrorMessage';
import { useQuery } from '@apollo/react-hooks';
import { Catalog } from './Catolog';

import './style.css';

import { FilterContext } from '../PropertyFilter';
import { GET_APARTMENTS } from './graphql';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '100px 55px',
    [theme.breakpoints.down('lg')]: {
      padding: '100px 45px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '100px 45px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '100px 0',
    },
  },
  gridContainer: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '80vw',
    },
    paddingBottom: theme.spacing(6),
  },
  title: {
    marginBottom: '100px',
  },
  expandButtonContainer: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
}));

const props = (prevProps, nextProps) => true;

export const CatalogSection = memo(() => {
  const searchParams = useContext(FilterContext);
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_APARTMENTS);
  const [filtredApartments, setFilteredApartments] = useState();
  const container = useRef();
  const classes = useStyles();

  const gatherApartments = useCallback(
    (limit, skip) => {
      fetchMore({
        // note this is a different query than the one used in the
        // Query component
        query: GET_APARTMENTS,
        variables: { limit, skip },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const previousEntry = previousResult;
          const { apartments } = fetchMoreResult;

          return {
            // Put the new comments in the front of the list
            apartments: [...apartments, ...previousEntry.apartments],
          };
        },
      });
    },
    [fetchMore]
  );

  useEffect(() => {
    try {
      if (searchParams) {
        const { bedrooms, price, selectedDate } = searchParams;
        refetch();
        let result = data.apartments;
        if (bedrooms) {
          result = result.filter((item) => item.bedrooms === bedrooms);
        }

        if (price) {
          result = result.filter(
            (item) => item.price >= price[0] && item.price <= price[1]
          );
        }

        setFilteredApartments(result);
      }
    } catch (error) {
      console.log(`Error => ${error}`);
    }
  }, [data, refetch, searchParams]);

  const fetchedApartments = loading
    ? Array.from(new Array(6))
    : filtredApartments
    ? filtredApartments
    : !error && data.apartments;
  return (
    <section id="apartments-section" className={classes.section}>
      {' '}
      <h1 className={classes.title}>Apartments</h1>
      <Grid
        ref={container}
        container
        spacing={3}
        className={classes.gridContainer}
      >
        {error ? (
          <ErrorMessage src="Sorry, most likely you are not connected to the internet" />
        ) : fetchedApartments.length ? (
          <Catalog apartments={fetchedApartments} container={container} />
        ) : (
          <ErrorMessage src="No apartments matched your criteria" />
        )}

        <Grid
          style={{ order: fetchedApartments.length - 1 }}
          item
          xs={12}
          className={classes.expandButtonContainer}
        >
          <Button
            onClick={() => gatherApartments(3, 3)}
            variant="outlined"
            color="primary"
            disabled={loading || error ? true : false}
          >
            View More
          </Button>
        </Grid>
      </Grid>
    </section>
  );
}, props);
