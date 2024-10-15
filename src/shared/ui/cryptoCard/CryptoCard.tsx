import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    IconButton,
    Typography
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import {CryptoDataModel} from "shared/types/cryproData.ts";
import {removeCoin} from "entities/model/cryptoStore";


interface props {
    crypto: CryptoDataModel
}

export const CryptoCard = ({crypto}: props) => {

    const onClose =()=> {
        removeCoin(crypto);
    }

    return (
        <Card sx={{
            m: 2,
            height: "15%",
            width: "90%",
        }}>
            <CardActionArea>
                <CardHeader
                    sx={{p:0}}
                    action={
                        <IconButton onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography gutterBottom variant={'h5'}>{crypto.name}</Typography>
                    <Typography variant={'h6'}>{crypto.symbol}</Typography>
                    <Typography variant={'h6'}>Price: {crypto.priceUsd}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}