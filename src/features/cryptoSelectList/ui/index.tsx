import {useEffect} from "react";
import {Box, List} from "@mui/material";

import {CryptoDataModel} from "shared/types/cryptoData";
import {CryptoCard} from "shared/ui/cryptoCard/CryptoCard";
import {CryptoModel} from "entities/crypto";
import {useUpdateCryptoPrice} from "entities/crypto/hooks";

interface Props {
    cryptoItems: CryptoDataModel[];
}

export const CryptoSelectList = ({cryptoItems}:Props) => {
    const updatedCoins = useUpdateCryptoPrice(cryptoItems)

    useEffect(() => {
        CryptoModel.addCoin(updatedCoins)
    }, [updatedCoins]);

    const handleRemove = (coin: CryptoDataModel) => {
        CryptoModel.removeCoin(coin)
    }

    if (cryptoItems.length === 0) {
        return null;
    }

    return (
        <Box sx={{
            overflowY: 'auto',
        }}>
            <List sx={{
                minWidth: "30%",
            }}>
                {cryptoItems.map((crypto: CryptoDataModel) => {
                    return <CryptoCard key={crypto.id} coin={crypto} onRemove={handleRemove}/>
                })}
            </List>
        </Box>
    )
}