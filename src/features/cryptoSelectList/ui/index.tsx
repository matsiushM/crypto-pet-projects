import {Box, List} from "@mui/material";
import {$selectedCrypto} from "entities/model";
import {useUnit} from "effector-react";
import {cryptoDataModel} from "shared/model/cryproData";
import {CryptoCard} from "shared/ui/cryptoCard";

export const CryptoSelectList = () => {

    const coin = useUnit($selectedCrypto)

    return (
        <Box sx ={{
            overflowY: 'auto',
        }}>
            {coin.length>0 &&
            <List sx={{
                minWidth: "30%",
                borderColor: '#ff0000',
                border: 1,
                borderRadius: 2,
            }}>
                {coin?.map((crypto: cryptoDataModel) => {
                    return <CryptoCard key={crypto.id} crypto={crypto}></CryptoCard>
                })}
            </List>
            }
        </Box>
    )
}