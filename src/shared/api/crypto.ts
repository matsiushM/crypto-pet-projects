export const cryptoList = () =>
    fetch(`https://api.coincap.io/v2/assets?limit=1000`, {
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
        .catch((error) => console.log(error))