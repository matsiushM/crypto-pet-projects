import {Box, MenuItem, Paper, Select, SelectChangeEvent} from "@mui/material";
import {useUnit} from "effector-react/compat";

import {ChartIntervalTime} from "shared/const/chartIntervalTime.ts";
import {CryptoChart} from "shared/ui/cryptoChart";
import {cryptoModel} from "entities/crypto";
import {selectIntervalToChart} from "entities/crypto/model";
import {StockMarketTable} from "shared/ui/stockMarketTable";

const styles = {
    boxStyle: {
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

    if (prices.length === 0) {
        return null
    }

    return (
        <Box sx={styles.boxStyle}>
            <Paper sx={{m:1, height:'60%', width:'100%'}}>
                <CryptoChart/>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dataFetch.interval}
                    onChange={handleChange}
                    size={'small'}
                    sx={{m:1}}
                >
                    {Object.entries(ChartIntervalTime).map(([key, value]) =>
                        <MenuItem value={key} key={key}>{value}</MenuItem>
                    )}
                </Select>
            </Paper>
            <Paper sx={{m:1, height:'40%', width:'100%'}}>
                <StockMarketTable/>
            </Paper>
        </Box>
    )
}   