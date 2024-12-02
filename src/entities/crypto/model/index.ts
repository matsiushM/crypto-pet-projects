import {createEffect, createEvent, createStore, sample} from "effector";
import persist from "effector-localstorage";

import {CryptoDataModel} from "shared/types/cryptoData.ts";
import {cryptoList, cryptoSelectPrice} from "shared/api";
import {CharDataFetch, ChartData} from "shared/types/chartData.ts";

export const addCoin = createEvent<CryptoDataModel[]>()
export const removeCoin = createEvent<CryptoDataModel>()

export const $selectedCrypto = createStore<CryptoDataModel[]>([])
    .on(addCoin, (_, coin) => coin)
    .on(removeCoin, (state, coin) =>
        state.filter((item) => item.id !== coin.id)
    )

export const fetchCryptoReposFx = createEffect(cryptoList);

export const $crypto = createStore<CryptoDataModel[]>([])
    .on(fetchCryptoReposFx.doneData, (_, crypto) => crypto)


export const selectCryptoToChart = createEvent<string>()

export const selectIntervalToChart = createEvent<string>()

export const $cryptoSelectChart = createStore<CharDataFetch>({coin: '', interval: 'h2'})
    .on(selectCryptoToChart, (dataFetch , coin) => ({...dataFetch, coin: coin}))
    .on(selectIntervalToChart, (dataFetch , coin) => ({...dataFetch, interval: coin}))

export const fetchCryptoPriceFx = createEffect(({coin, interval} :CharDataFetch) => cryptoSelectPrice(coin, interval));

export const $cryptoPriceChart = createStore<ChartData[]>([])
    .on(fetchCryptoPriceFx.doneData, (_, crypto) => crypto);

sample({
    clock: [selectCryptoToChart, selectIntervalToChart],
    source: $cryptoSelectChart,
    fn: (data: CharDataFetch) => (data),
    target: fetchCryptoPriceFx
})

persist({
    key: 'coinSelected',
    store: $selectedCrypto,
})