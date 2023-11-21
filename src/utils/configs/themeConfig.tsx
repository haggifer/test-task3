import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { Theme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Theme {
    palette: Palette,
  }

  interface ThemeOptions {
    palette?: PaletteOptions,
  }

  interface Palette {
    primary: PaletteColor,
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions,
  }
}

export const getTheme = (): Theme => {
  return createTheme({
    spacing: 5,
    components: {
      MuiButton: {
        styleOverrides: {
          root: () => ({
            minHeight: '40px',
            borderRadius: '10px',
            padding: '5px 20px',
            fontSize: '14px',
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: 'none',
            '&, &:hover, &:active': {
              borderWidth: '2px',
            },
          }),
        },
      },
    },
    palette: {
      primary: {
        main: '#143286',
      }
    }
  });
}