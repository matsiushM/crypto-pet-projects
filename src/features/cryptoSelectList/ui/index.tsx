import {useEffect} from "react";
import {Box, List} from "@mui/material";

import {CryptoDataModel} from "shared/types/cryptoData";
import {CryptoCard} from "shared/ui/cryptoCard/CryptoCard";
import {cryptoHooks, cryptoModel} from "entities/crypto";

interface Props {
    cryptoItems: CryptoDataModel[];
}

export const CryptoSelectList = ({cryptoItems}:Props) => {
    const updatedCoins = cryptoHooks.useUpdateCryptoPrice(cryptoItems)

    useEffect(() => {
        cryptoModel.addCoin(updatedCoins)
    }, [updatedCoins]);

    const handleRemove = (coin: CryptoDataModel) => {
        cryptoModel.removeCoin(coin)
    }

    const handleClick = (coin: string) => {
        cryptoModel.selectCryptoToChart(coin)
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
                    return <CryptoCard key={crypto.id} coin={crypto} onRemove={handleRemove} onClick={handleClick}/>
                })}
            </List>
        </Box>
    )
}