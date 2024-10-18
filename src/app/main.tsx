import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {CssBaseline, GlobalStyles, ThemeProvider} from "@mui/material";

import App from "./App.tsx";
import {theme} from "app/theme.ts";

const style = {
    global: {
        html: { height: '100%' },
        body: {
            height: '100%',
            margin: 0,
            padding: 0,
        },
        '#root': { height: '100%' },
    }
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <GlobalStyles styles={style.global}/>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)