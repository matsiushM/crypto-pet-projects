import {Box, List} from "@mui/material";
import {useUnit} from "effector-react";

import {CryptoDataModel} from "shared/types/cryptoData.ts";
import {CryptoCard} from "shared/ui/cryptoCard/CryptoCard";
import {$selectedCrypto, removeCoin} from "entities/crypto/model";

export const CryptoSelectList = () => {
    const coin = useUnit($selectedCrypto)

    const handleRemove = (coin: CryptoDataModel) => {
        removeCoin(coin)
    }

    if (coin.length === 0) {
        return null;
    }

    return (
        <Box sx={{
            overflowY: 'auto',
        }}>
            <List sx={{
                minWidth: "30%",
            }}>
                {coin?.map((crypto: CryptoDataModel) => {
                    return <CryptoCard key={crypto.id} coin={crypto} onRemove={handleRemove}/>
                })}
            </List>
        </Box>
    )
}