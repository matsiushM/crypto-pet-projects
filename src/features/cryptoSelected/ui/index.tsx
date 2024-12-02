import {MenuItem, Paper, Select, SelectChangeEvent} from "@mui/material";
import {useUnit} from "effector-react/compat";

import {ChartIntervalTime} from "shared/const/chartIntervalTime.ts";
import {CryptoChart} from "shared/ui/cryptoChart";
import {cryptoModel} from "entities/crypto";
import {selectIntervalToChart} from "entities/crypto/model";

const styles = {
    paperStyle: {
        width: '95%',
        height: '95%',
        m: 2
    }
}

export const CryptoSelected = () => {
    const dataFetch = useUnit(cryptoModel.$cryptoSelectChart)
    const prices = useUnit(cryptoModel.$cryptoPriceChart)

    const handleChange = (event: SelectChangeEvent) => {
        selectIntervalToChart(event.target.value as string);
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
                        value={dataFetch.interval}
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