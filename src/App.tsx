import React, { ReactElement, useMemo } from 'react';
import Routes from "./routing/Routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StyledEngineProvider, Theme } from '@mui/material/styles';
import { getTheme } from "utils/configs/themeConfig";

import './assets/scss/index.scss';

export default function App(): ReactElement {
  const theme = useMemo<Theme>(() => getTheme(), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>

      <StyledEngineProvider injectFirst>
        <Routes/>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}