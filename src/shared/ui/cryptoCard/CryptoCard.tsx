import {
    Card, CardActionArea,
    CardContent,
    CardHeader,
    IconButton,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import {CryptoDataModel} from "shared/types/cryptoData";

interface props {
    coin: CryptoDataModel;
    onRemove: (coin: CryptoDataModel) => void
    onClick: (coin:string) => void
}

const styles = {
    cardBox: {
        m: 2,
        height: "15%",
        width: "90%",
    }
}

export const CryptoCard = ({onRemove, onClick, coin}: props) => {

    const handleClose = () => {
        onRemove(coin);
    }

    const handleClick = () => {
        onClick(coin.id)
    }

    return (
        <Card sx={styles.cardBox}>
            <CardActionArea onClick={handleClick}>
                <CardHeader
                    sx={{p: 0}}
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