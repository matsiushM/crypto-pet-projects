import {MenuItem, Paper, Select, SelectChangeEvent} from "@mui/material";
import {useEffect, useState} from "react";
import {ChartData} from "shared/types/chartData.tsx";
import {cryptoSelectPrice} from "shared/api";
import {ChartIntervalTime} from "shared/types/chartIntervalTime.ts";
import {CryptoChart} from "shared/ui/cryptoChart";
import {useUnit} from "effector-react/compat";
import {$cryptoSelectChart} from "entities/crypto/model";

const styles = {
    paperStyle: {
        width: '95%',
        height: '95%',
        m: 2
    }
}

export const CryptoSelected = () => {
    const coin = useUnit($cryptoSelectChart)
    const [interval, setInterval] = useState(ChartIntervalTime.h2)
    const [dataPrice, setDataPrice] = useState<ChartData[]>()

    useEffect(() => {
        if (coin) {
            cryptoSelectPrice(coin, interval).then((data) => setDataPrice(data));
        }
    }, [interval, coin])

    const handleChange = (event: SelectChangeEvent) => {
        setInterval(event.target.value as string);
    }

    return (
        <Paper sx={styles.paperStyle}>
            {!!dataPrice &&
                <>
                    <CryptoChart prices={dataPrice}/>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={interval}
                        onChange={handleChange}
                        size={'small'}
                    >
                        {Object.entries(ChartIntervalTime).map(([key, value]) =>
                            <MenuItem value={key}>{value}</MenuItem>
                        )}
                    </Select>
                </>
            }
        </Paper>
    )
}   