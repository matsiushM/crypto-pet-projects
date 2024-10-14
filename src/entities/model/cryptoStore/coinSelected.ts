import {createEvent, createStore} from "effector";
import persist from "effector-localstorage";

import {cryptoDataModel} from "shared/model/cryproData";

export const addCoin = createEvent<cryptoDataModel[]>()
export const removeCoin = createEvent<cryptoDataModel>()

export const $selectedCrypto = createStore<cryptoDataModel[]>([])
    .on(addCoin, (_,coin) => coin)
    .on(removeCoin, (state,coin) =>
        state.filter((item) => item.id !== coin.id)
    )

persist({
    key: 'coinSelected',
    store: $selectedCrypto,
})