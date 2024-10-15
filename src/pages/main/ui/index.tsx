import {Box} from "@mui/material";

import {CryptoSelectList} from "features/cryptoSelectList";

const styles = {
    boxStyle: {
        color: 'palette.white',
        display: "flex",
        maxHeight: '90%'
    }
}

export const HomePage = () => {
    return (
        <Box sx={styles.boxStyle}>
            <CryptoSelectList/>
        </Box>
    )
}