import gql from 'graphql-tag';

export const ADD_BOOKING = gql`
  mutation AddBooking($userInput: BookingInput) {
    addBooking(userInput: $userInput)
  }
`;
