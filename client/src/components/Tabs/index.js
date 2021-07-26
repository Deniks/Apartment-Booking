import React, { useEffect } from 'react';

import { StyledTab, StyledTabs } from './StyledTabs';
export { TabPanel } from './TabPanel';

export const Tabs = ({ children, onChange, value }) => {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('resize'));
  });

  const a11yProps = (index) => ({
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  });
  return (
    <>
      <StyledTabs
        value={value}
        onChange={onChange}
        aria-label="disabled tabs example"
        centered
        variant="fullWidth"
      >
        <StyledTab label="Description" {...a11yProps(0)} />
        <StyledTab label="Features" {...a11yProps(1)} />
        <StyledTab label="Map" {...a11yProps(2)} />
      </StyledTabs>
    </>
  );
};
