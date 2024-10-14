import {createEvent, createStore} from "effector";
import {cryptoDataModel} from "../../../shared/model/cryproData.ts";
const coin = JSON.parse(localStorage.getItem("cryptoSelected"))

const addCoin = createEvent<cryptoDataModel[]>()

export const $selectedCrypto = createStore<cryptoDataModel[]>(coin)
    .on(addCoin, (_,coin) => coin)

export  const  events = {addCoin}