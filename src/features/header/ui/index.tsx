import {Autocomplete, Box, TextField} from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";
import {useUnit} from "effector-react";

import {cryptoList} from "shared/api";
import {$selectedCrypto, addCoin} from "entities/model";
import {cryptoDataModel} from "shared/model/cryproData";

const styles = {
    boxHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#FFFFFF",
        backgroundColor: "#2657da",
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
    const [cryptoData, setCryptoData] = useState<cryptoDataModel[]>([]);
    const selectCoin = useUnit($selectedCrypto);

    useEffect(() => {
        cryptoList().then(res => {
            setCryptoData(res.data)
        });
    }, [])

    const handleChange = (_: SyntheticEvent<Element, Event>, value: cryptoDataModel[]) => {
        addCoin(value);
    }

    return (
        <Box sx={styles.boxHeader}>
            <Autocomplete
                multiple
                limitTags={2}
                sx={styles.searchComp}
                getOptionLabel={(cryptoData: cryptoDataModel) => cryptoData.name}
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
