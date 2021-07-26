import React, { useState, createContext } from 'react';

import { ProperyForm } from '../PropertyForm';

export const FilterContext = createContext();

export const PropertyFilter = ({ children }) => {
  const [searchParams, setSearchParams] = useState();
  const [bedrooms, setBedrooms] = useState(1);
  const [price, setPrice] = useState([50, 150]);
  const [selectedDate, setSelectedDate] = useState([null, null]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleBedroomChange = (event) => {
    setBedrooms(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleSearch = () => {
    setSearchParams({ bedrooms, price, selectedDate });
    document
      .querySelector('#apartments-section')
      .scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  };

  return (
    <FilterContext.Provider value={searchParams}>
      <ProperyForm
        bedrooms={bedrooms}
        handleBedroomChange={handleBedroomChange}
        price={price}
        handlePriceChange={handlePriceChange}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        handleSearch={handleSearch}
      />
      {children}
    </FilterContext.Provider>
  );
};
