import {Box, List} from "@mui/material";
import {useUnit} from "effector-react";

import {CryptoDataModel} from "shared/types/cryproData";
import {CryptoCard} from "shared/ui/cryptoCard";
import {$selectedCrypto, removeCoin} from "entities/model/cryptoStore";

export const CryptoSelectList = () => {
    const coin = useUnit($selectedCrypto)

    if (coin.length === 0) {
        return null;
    }

    const removeCrypto = (coin: CryptoDataModel) => {
        removeCoin(coin)
    }

    return (
        <Box sx={{
            overflowY: 'auto',
        }}>
            <List sx={{
                minWidth: "30%",
            }}>
                {coin?.map((crypto: CryptoDataModel) => {
                    return <CryptoCard key={crypto.id} coin={crypto} removeSelectCoin={removeCrypto}></CryptoCard>
                })}
            </List>
        </Box>
    )
}