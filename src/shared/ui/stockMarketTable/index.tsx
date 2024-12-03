    import {useMemo} from 'react';
    import {
        MaterialReactTable,
        useMaterialReactTable,
        type MRT_ColumnDef,
    } from 'material-react-table';
    import {useUnit} from "effector-react";

    import {cryptoModel} from "entities/crypto";
    import {CryptoStockMarketData} from "shared/types/cryptoStockMarketData";
    import {Box} from "@mui/material";


    export const StockMarketTable = () => {
        const data = useUnit(cryptoModel.$stockMarketData)



        const columns = useMemo<MRT_ColumnDef<CryptoStockMarketData>[]>(
            () => [
                {
                    accessorKey: 'exchangeId',
                    header: 'Названия',
                    size: 200,
                },
                {
                    accessorKey: 'baseSymbol',
                    header: 'Основная валюта',
                    size: 200,
                },
                {
                    accessorKey: 'quoteSymbol',
                    header: 'Валюта покупки',
                    size: 200,
                },
                {
                    accessorKey: 'priceUsd',
                    header: 'Цена в USD',
                    size: 200,
                    Cell: ({cell}) => {
                        const value = cell.getValue()
                        return new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(Number(value));
                    }
                },
            ],
            [],
        );

        const table = useMaterialReactTable({
            columns,
            data,
            defaultDisplayColumn: { enableResizing: false },
            enableBottomToolbar: false,
            enableColumnResizing: false,
            enableColumnVirtualization: true,
            enableGlobalFilterModes: true,
            enablePagination: false,
            enableColumnPinning: true,
            enableRowNumbers: true,
            enableRowVirtualization: true,
            muiTableContainerProps: { sx: { maxHeight: '600px' } },
        });

        return (
            <Box sx={{height: '100%', overflow: 'hidden'}}>
                <MaterialReactTable table={table}/>
            </Box>
        )
    }