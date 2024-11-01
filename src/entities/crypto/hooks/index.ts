import {CryptoDataModel} from "shared/types/cryptoData";
import {useEffect, useRef, useState} from "react";

export const useUpdateCrypto = (cryptoItem:CryptoDataModel[]) => {
    const refSocket = useRef<WebSocket | null>()
    const [updateCoin, setUpdateCoin] = useState<CryptoDataModel[]>(cryptoItem)

    useEffect(() => {
        refSocket.current = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')

        refSocket.current.onmessage = (item) => {
            const coinPrice = JSON.parse(item.data)
            setUpdateCoin(prevState =>  prevState.map(itemCoin => ({
                     ...itemCoin,
                    priceUsd: coinPrice[itemCoin.id] ?? itemCoin.priceUsd,
                    })
                )
            )
        }
        return () => {
            refSocket.current?.close()
            refSocket.current = null;
        }
    }, [])

    useEffect(()=>{
        setUpdateCoin(cryptoItem)
    }, [cryptoItem])

    return updateCoin;
}
