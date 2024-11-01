import {Box} from "@mui/material";

import {CryptoSelectList} from "features/cryptoSelectList";
import {useUnit} from "effector-react";
import { CryptoModel } from "entities/crypto";

const styles = {
    boxStyle: {
        display: "flex",
        height: "100%",
    }
}

export const HomePage = () => {
    const cryptoSelected = useUnit(CryptoModel.$selectedCrypto)

    if (cryptoSelected.length === 0) return null;

    return (
        <Box sx={styles.boxStyle}>
            <CryptoSelectList cryptoItems={cryptoSelected} key={"listCrypto"}/>
        </Box>
    )
}