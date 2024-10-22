import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    IconButton,
    Typography
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import {CryptoDataModel} from "shared/types/cryproData";


interface props {
    coin: CryptoDataModel;
    onRemove: (coin: CryptoDataModel)=>void
}

export const CryptoCard = ({onRemove, coin}: props) => {

    const handleClose =()=> {
        onRemove(coin);
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
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography gutterBottom variant={'h5'}>{coin.name}</Typography>
                    <Typography variant={'h6'}>{coin.symbol}</Typography>
                    <Typography variant={'h6'}>Price: {coin.priceUsd}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}