import {MenuItem, Paper, Select, SelectChangeEvent} from "@mui/material";
import {useEffect, useState} from "react";
import {useUnit} from "effector-react/compat";

import {ChartIntervalTime} from "shared/const/chartIntervalTime.ts";
import {CryptoChart} from "shared/ui/cryptoChart";
import {cryptoModel} from "entities/crypto";

const styles = {
    paperStyle: {
        width: '95%',
        height: '95%',
        m: 2
    }
}

export const CryptoSelected = () => {
    const coin = useUnit(cryptoModel.$cryptoSelectChart)
    const prices = useUnit(cryptoModel.$cryptoPriceChart)
    const [interval, setInterval] = useState(ChartIntervalTime.h2)
    // const [dataPrice, setDataPrice] = useState<ChartData[]>([])

    useEffect(() => {
        if (coin) {
            cryptoModel.fetchCryptoPriceFx({coin,interval})
        }
    }, [interval, coin])

    const handleChange = (event: SelectChangeEvent) => {
        setInterval(event.target.value as string);
    }

    if(prices.length === 0) {
        return null
    }

    return (
        <Paper sx={styles.paperStyle}>
                    <CryptoChart />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={interval}
                        onChange={handleChange}
                        size={'small'}
                    >
                        {Object.entries(ChartIntervalTime).map(([key, value]) =>
                            <MenuItem value={key} key={key}>{value}</MenuItem>
                        )}
                    </Select>
        </Paper>
    )
}   