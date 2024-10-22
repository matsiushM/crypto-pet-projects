import {Box} from "@mui/material";

import {CryptoSelectList} from "features/cryptoSelectList";

const styles = {
    boxStyle: {
        display: "flex",
        height: "100%",
    }
}

export const HomePage = () => {
    return (
        <Box sx={styles.boxStyle}>
            <CryptoSelectList/>
        </Box>
    )
}