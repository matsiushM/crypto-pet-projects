import {Autocomplete, Box, TextField} from "@mui/material";
import {SyntheticEvent, useEffect} from "react";
import {useUnit} from "effector-react";

import {CryptoDataModel} from "shared/types/cryproData.ts";
import {$selectedCrypto, $crypto, addCoin, fetchCryptoReposFx} from "entities/model/cryptoStore";

const styles = {
    boxHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#FFFFFF",
        backgroundColor: "secondary.main",
    },
    searchComp: {
        width: '40%',
        m: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        '&:hover .MuiOutlinedInput-notchedOutline': {
            position: '',
            borderColor: '#ff0000',
        },
    }
}

export const HeaderApp = () => {
    const cryptoData = useUnit($crypto);
    const selectCoin = useUnit($selectedCrypto);

    useEffect(() => {
        fetchCryptoReposFx();
    }, []);

    const handleChange = (_: SyntheticEvent<Element, Event>, value: CryptoDataModel[]) => {
        addCoin(value);
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
