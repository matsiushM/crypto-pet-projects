import {Box} from "@mui/material";

import {CryptoSelectList} from "features/cryptoSelectList";
import {useUnit} from "effector-react";
import { cryptoModel } from "entities/crypto";

const styles = {
    boxStyle: {
        display: "flex",
        height: "100%",
    }
}

export const HomePage = () => {
    const cryptoSelected = useUnit(cryptoModel.$selectedCrypto)

    if (cryptoSelected.length === 0) return null;

    return (
        <Box sx={styles.boxStyle}>
            <CryptoSelectList cryptoItems={cryptoSelected}/>
        </Box>
    )
}