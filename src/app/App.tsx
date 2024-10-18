import {Box} from "@mui/material";

import {HomePage} from "pages/main";
import {HeaderApp} from "features/header";

const styles = {
    layoutBox: {
        backgroundColor: "primary.main",
        width: "100%",
        height: "100%",
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
