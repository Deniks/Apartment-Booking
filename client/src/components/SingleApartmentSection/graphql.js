import gql from 'graphql-tag';

export const GET_APARTMENT = gql`
  query getApartment($apartmentName: String!) {
    apartment(apartmentName: $apartmentName) {
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
