import {Box, List} from "@mui/material";
import {useUnit} from "effector-react";

import {CryptoDataModel} from "shared/types/cryproData.ts";
import {CryptoCard} from "shared/ui/cryptoCard";
import {$selectedCrypto} from "entities/model/cryptoStore";

export const CryptoSelectList = () => {
    const coin = useUnit($selectedCrypto)

    return (
        coin.length > 0 && (
            <Box sx={{
                overflowY: 'auto',
            }}>
                <List sx={{
                    minWidth: "30%",
                    borderColor: '#ff0000',
                    border: 1,
                    borderRadius: 2,
                }}>
                    {coin?.map((crypto: CryptoDataModel) => {
                        return <CryptoCard key={crypto.id} crypto={crypto}></CryptoCard>
                    })}
                </List>
            </Box>
        )
    )
}