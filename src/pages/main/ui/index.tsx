import {Box} from "@mui/material";

import {CryptoSelectList} from "features/cryptoSelectList";

export const HomePage = () => {
    return (
        <Box sx ={{color: "#FFFFFF", display: "flex", maxHeight: '90%'}}>
            <CryptoSelectList/>
        </Box>
    )
}