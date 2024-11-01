import {useEffect} from "react";
import {Box, List} from "@mui/material";

import {CryptoDataModel} from "shared/types/cryptoData";
import {CryptoCard} from "shared/ui/cryptoCard/CryptoCard";
import {CryptoModel} from "entities/crypto";
import {useUpdateCrypto} from "entities/crypto/hooks";
import {addCoin} from "entities/crypto/model";

interface Props {
    cryptoItems: CryptoDataModel[];
}

export const CryptoSelectList = ({cryptoItems}:Props) => {
    const coin = useUpdateCrypto(cryptoItems)

    useEffect(() => {
        addCoin(coin)
    }, [coin]);

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