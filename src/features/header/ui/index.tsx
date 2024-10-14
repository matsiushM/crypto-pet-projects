import {Autocomplete, Box, TextField} from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";
import {cryptoDataModel} from "../../../shared/model/cryproData.ts";
import {cryptoList} from "../../../shared/api";
import {$selectedCrypto, events} from "../../../entities/model";


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
    const [cryptoSelected, setCryptoSelected] = useState<cryptoDataModel[]>([])

    useEffect(() => {
        cryptoList().then(res => {
            setCryptoData(res.data)
        });

        setCryptoSelected(JSON.parse(localStorage.getItem("cryptoSelected")));
    }, [])

    const handleChange = (_: SyntheticEvent<Element, Event>, value: cryptoDataModel[]) => {
        setCryptoSelected(value)
        localStorage.setItem("cryptoSelected", JSON.stringify(value));
        events.addCoin(value);
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
                value={cryptoSelected}
                disableCloseOnSelect
                disabledItemsFocusable
                renderInput={(params) => (
                    <TextField {...params} label="Select crypto"/>
                )}
            />
        </Box>
    )
}
