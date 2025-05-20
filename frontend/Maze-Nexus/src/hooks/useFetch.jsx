import { useState, useFetch, useEffect } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(url)

            const resJson = await res.json()

            setData(resJson)
        }

        fetchData()

    }, [url])

    //Retornando dados da requisição
    return { data }
}