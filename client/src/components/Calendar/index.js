import React from 'react';

import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import TextField from '@material-ui/core/TextField';
import {
  LocalizationProvider,
  DateRangePicker,
  DateRangeDelimiter,
  StaticDateRangePicker,
} from '@material-ui/pickers';

export const Calendar = ({
  value,
  onChange,
  inputStyle,
  delimiterStyle,
  calendars = 1,
  variant = 'dialog',
}) => {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      {variant === 'static' ? (
        <StaticDateRangePicker
          displayStaticWrapperAs="desktop"
          value={value}
          onChange={onChange}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} />
              <DateRangeDelimiter> to </DateRangeDelimiter>
              <TextField {...endProps} />
            </>
          )}
        />
      ) : (
        <DateRangePicker
          calendars={calendars}
          disablePast
          variant={variant}
          value={value}
          onChange={onChange}
          maxDate={maxDate}
          renderInput={(startProps, endProps) => {
            startProps.label = 'check in';
            startProps.helperText = null;
            endProps.label = 'check out';
            endProps.helperText = null;
            return (
              <>
                <TextField
                  margin="dense"
                  fullWidth
                  className={inputStyle}
                  {...startProps}
                />
                <DateRangeDelimiter className={delimiterStyle}>
                  {' '}
                  to{' '}
                </DateRangeDelimiter>
                <TextField
                  margin="dense"
                  fullWidth
                  className={inputStyle}
                  {...endProps}
                />
              </>
            );
          }}
        />
      )}
    </LocalizationProvider>
  );
};
