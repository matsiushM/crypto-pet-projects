    import {useMemo} from 'react';
    import {
        MaterialReactTable,
        useMaterialReactTable,
        type MRT_ColumnDef,
    } from 'material-react-table';
    import {useUnit} from "effector-react";
    import { Box } from '@mui/material';

    import {cryptoModel} from "entities/crypto";
    import {CryptoStockMarketData} from "shared/types/cryptoStockMarketData";


    export const StockMarketTable = () => {
        const data = useUnit(cryptoModel.$stockMarketData)

        const columns = useMemo<MRT_ColumnDef<CryptoStockMarketData>[]>(
            () => [
                {
                    accessorKey: 'exchangeId',
                    header: 'Названия',
                    enableColumnResizing: true,
                    size: 200,
                },
                {
                    accessorKey: 'baseSymbol',
                    header: 'Основная валюта',
                    enableColumnResizing: true,
                    size: 200,
                },
                {
                    accessorKey: 'quoteSymbol',
                    header: 'Валюта покупки',
                    enableColumnResizing: true,
                    size: 200,
                },
                {
                    accessorKey: 'priceUsd',
                    header: 'Цена в USD',
                    enableColumnResizing: true,
                    size: 200,
                },
            ],
            [],
        );

        const table = useMaterialReactTable({
            columns,
            data,
            defaultDisplayColumn: { enableResizing: true },
            enableBottomToolbar: false,
            enableColumnResizing: true,
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