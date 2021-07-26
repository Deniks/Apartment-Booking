import gql from 'graphql-tag';

export const GET_APARTMENTS = gql`
  query Apartment($limit: Int, $skip: Int) {
    apartments(limit: $limit, skip: $skip) {
      name
      price
      bedrooms
      bathrooms
      size
      description
      features
      address
    }
  }
`;
