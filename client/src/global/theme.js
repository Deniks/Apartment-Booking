import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { blue } from '@material-ui/core/colors';

export const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: 'Futura LT Book      , sans-serif',
      fontStyle: 'normal',
      fontDisplay: 'swap',
      fontWeight: 100,
      h4: {
        lineHeight: 2,
      },
    },
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: blue[500] /*'#c8e6c9'*/,
        dark: '#001d38',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#ffd0b0',
        main: '#ff9e80',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#263238',
      },

      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  })
);
