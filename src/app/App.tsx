import {Box} from "@mui/material";

import {HomePage} from "pages/main";
import {HeaderApp} from "features/header";

const styles = {
    layoutBox: {
        backgroundColor: "primary.main",
        width: "100vw",
        height: "100vh",
    }
}

function App() {
    return (
        <Box sx={styles.layoutBox}>
            <HeaderApp/>
            <HomePage/>
        </Box>
    )
}

export default App
