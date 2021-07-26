import React from 'react';

import './style.css';

export const Burger = ({ isActive }) => {
  return (
    <div
      className={`hamburger hamburger--collapse ${
        isActive ? 'is-active' : null
      }`}
    >
      <div className="hamburger-box">
        <div className="hamburger-inner"></div>
      </div>
    </div>
  );
};
