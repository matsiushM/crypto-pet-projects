import {createEffect, createEvent, createStore} from "effector";
import persist from "effector-localstorage";

import {CryptoDataModel} from "shared/types/cryproData.ts";

export const addCoin = createEvent<CryptoDataModel[]>()
export const removeCoin = createEvent<CryptoDataModel>()

export const $selectedCrypto = createStore<CryptoDataModel[]>([])
    .on(addCoin, (_, coin) => coin)
    .on(removeCoin, (state, coin) =>
        state.filter((item) => item.id !== coin.id)
    )

export const fetchCryptoReposFx = createEffect(() => {
   return fetch(`https://api.coincap.io/v2/assets?limit=1000`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not find any assets")
                }
                return response.json()
            }
        )
        .then(res => res.data)
        .catch((error) => console.error(error))
});

export const $crypto = createStore<CryptoDataModel[]>([])
    .on(fetchCryptoReposFx.doneData, (_, crypto) => crypto)

persist({
    key: 'coinSelected',
    store: $selectedCrypto,
})