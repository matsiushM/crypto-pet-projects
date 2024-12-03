export const cryptoList = () => {
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
        .catch((error) => {
            console.error(error.message)
            return error;
        })
}

export const cryptoSelectPrice = (coin:string ,interval:string) => {
    return fetch(`https://api.coincap.io/v2/assets/${coin}/history?interval=${interval}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not find any coin price")
                }
                return response.json()
            }
        )
        .then(res => res.data)
        .catch((error) => {
            console.error(error.message)
            return error;
        })
}

export const cryptoStockMarket = (coin:string) => {
    return fetch(`https://api.coincap.io/v2/assets/${coin}/markets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not find any coin price")
                }
                return response.json()
            }
        )
        .then(res => res.data)
        .catch((error) => {
            console.error(error.message)
            return error;
        })
}