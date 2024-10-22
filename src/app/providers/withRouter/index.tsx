import {FunctionComponent, Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {history} from "./history";

export const withRouter = (Component: FunctionComponent) =>
    // ts-ignore
    () => <BrowserRouter history={history}>
        <Suspense fallback={<LinearProgress/>}>
            <Component/>
        </Suspense>
    </BrowserRouter>