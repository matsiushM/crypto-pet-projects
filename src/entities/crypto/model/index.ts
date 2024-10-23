import {createEffect, createEvent, createStore} from "effector";
import persist from "effector-localstorage";

import {CryptoDataModel} from "shared/types/cryptoData.ts";
import {criptoList} from "shared/api";

export const addCoin = createEvent<CryptoDataModel[]>()
export const removeCoin = createEvent<CryptoDataModel>()

export const $selectedCrypto = createStore<CryptoDataModel[]>([])
    .on(addCoin, (_, coin) => coin)
    .on(removeCoin, (state, coin) =>
        state.filter((item) => item.id !== coin.id)
    )

export const fetchCryptoReposFx = createEffect(() => criptoList());

export const $crypto = createStore<CryptoDataModel[]>([])
    .on(fetchCryptoReposFx.doneData, (_, crypto) => crypto)

persist({
    key: 'coinSelected',
    store: $selectedCrypto,
})