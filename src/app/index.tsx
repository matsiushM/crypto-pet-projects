import {HeaderApp} from "features/header";
import {withProviders} from "app/providers";
import GlobalStyles from "app/styles/GlobalStyles";
import {Routing} from "pages/index.tsx";

const App = () => (
    <>
        <HeaderApp/>
        <Routing/>
        <GlobalStyles/>
    </>
)

export default withProviders(App)
