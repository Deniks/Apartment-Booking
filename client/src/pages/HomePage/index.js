import React from 'react';

import { Hero } from '../../components/Hero';
import { PropertyFilter } from '../../components/PropertyFilter';
import { CatalogSection } from '../../components/CatalogSection';
import { ContactsSection } from '../../components/ContactsSection';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <PropertyFilter>
        <CatalogSection />
      </PropertyFilter>
      <ContactsSection />
    </>
  );
};
