import React, { memo } from 'react';

import { Switch, Route, useLocation } from 'react-router-dom';
import { useTransition, animated, config } from 'react-spring';

import { CookiePolicy } from './components/CookiePolicy';
import { HomePage } from './pages/HomePage';
import { ApartmentsPage } from './pages/ApartmentsPage';
import { SingleApartmentPage } from './pages/SingleApartmentPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactsPage } from './pages/ContactsPage';
import { ErrorPage } from './pages/ErrorPage';

import {
  HOME_PAGE,
  APARTMENTS_PAGE,
  SINGLE_APARTMENT_PAGE,
  ABOUT_US_PAGE,
  CONTACTS_PAGE,
  ERROR_PAGE,
} from './global/routes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const location = useLocation();
  const homePage = location.pathname === '/';
  const transitions = useTransition(location, {
    from: {
      opacity: 0,
      transform: `scale(0)`,
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },

    config: config.stiff,
    reset: false,
  });

  return (
    <CookiePolicy>
      <Header />
      {transitions((style, item) => (
        <animated.div style={homePage ? {} : style}>
          <Switch location={item}>
            <Route exact path={HOME_PAGE} component={HomePage} />
            <Route exact path={APARTMENTS_PAGE} component={ApartmentsPage} />
            <Route
              path={SINGLE_APARTMENT_PAGE}
              component={SingleApartmentPage}
            />
            <Route exact path={CONTACTS_PAGE} component={ContactsPage} />
            <Route exact path={ABOUT_US_PAGE} component={AboutUsPage} />
            <Route path={ERROR_PAGE} component={ErrorPage} />
          </Switch>
        </animated.div>
      ))}
      <Footer />
    </CookiePolicy>
  );
}

export default App;
