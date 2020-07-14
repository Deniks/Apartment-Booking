import React, { createContext } from 'react';

import { Header } from '../../components/Header';
import { SingleApartmentSection } from '../../components/SingleApartmentSection';
import { Footer } from '../../components/Footer';

export const MatchContext = createContext();

export const SingleApartmentPage = ({ match }) => {
  return (
    <MatchContext.Provider value={match}>
      <SingleApartmentSection />
    </MatchContext.Provider>
  );
};
