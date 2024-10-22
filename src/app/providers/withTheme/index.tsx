import {FunctionComponent} from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";

import theme from './theme';

export const withTheme = (Component: FunctionComponent) =>
    () =>  <ThemeProvider theme={theme}>
    <Component />
    <CssBaseline />
</ThemeProvider>