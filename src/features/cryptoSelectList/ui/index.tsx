import {List} from "@mui/material";
import {CryptoCard} from "../../../shared/ui/cryptoCard";
import {cryptoDataModel} from "../../../shared/model/cryproData.ts";
import {$selectedCrypto} from "../../../entities/model";
import {useUnit} from "effector-react";


export const CryptoSelectList = () => {

    const coin = useUnit($selectedCrypto)

    return (
            <List sx={{
                minWidth: "30%",
                borderColor: '#ff0000',
                border: 1,
                borderRadius: 2,
                overflowY: 'auto',
            }}>
                {coin?.map((crypto: cryptoDataModel) => {
                    return <CryptoCard key={crypto.id} crypto={crypto}></CryptoCard>
                })}
            </List>
    )

}