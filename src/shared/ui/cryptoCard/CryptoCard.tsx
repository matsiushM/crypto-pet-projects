import {cryptoDataModel} from "../../model/cryproData.ts";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

interface props {
    crypto: cryptoDataModel
}

export const CryptoCard = ({crypto}: props) => {

    return (
        <Card sx={{
            m: 2,
            height: "15%",
            width: "90%",
        }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant={'h5'}>{crypto.name}</Typography>
                    <Typography variant={'h6'}>{crypto.symbol}</Typography>
                    <Typography variant={'h6'}>Price: {crypto.priceUsd}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}