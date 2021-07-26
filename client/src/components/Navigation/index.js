import React from 'react';

import { Link } from 'react-router-dom';

export const Navigation = React.forwardRef(({ className }, ref) => {
  return (
    <nav ref={ref} className={className} id="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
        <li>
          <Link to="/apartments">Apartments</Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
      </ul>
    </nav>
  );
});
