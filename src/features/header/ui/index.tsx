import {Autocomplete, Box, TextField} from "@mui/material";
import {SyntheticEvent, useEffect} from "react";
import {useUnit} from "effector-react";

import {CryptoDataModel} from "shared/types/cryptoData";
import {cryptoModel} from 'entities/crypto';

const styles = {
    boxHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#FFFFFF",
        backgroundColor: "primary.light",
        height: "10%",
    },
    searchComp: {
        width: '40%',
        m: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    }
}

export const HeaderApp = () => {
    const [cryptoData, selectCoin] = useUnit([cryptoModel.$crypto, cryptoModel.$selectedCrypto]);

    useEffect(() => {
        cryptoModel.fetchCryptoReposFx();
    }, []);

    const handleChange = (_: SyntheticEvent<Element, Event>, value: CryptoDataModel[]) => {
        cryptoModel.addCoin(value);
    }

    return (
        <Box sx={styles.boxHeader}>
            <Autocomplete
                multiple
                limitTags={2}
                sx={styles.searchComp}
                getOptionLabel={(cryptoData: CryptoDataModel) => cryptoData.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={cryptoData}
                onChange={handleChange}
                value={selectCoin}
                disableCloseOnSelect
                disabledItemsFocusable
                renderInput={(params) => (
                    <TextField {...params} label="Select crypto"/>
                )}
            />
        </Box>
    )
}
