import fetch from "node-fetch";


export const getImages = async () => {
    const url = "https://jsonplaceholder.typicode.com/photos";
    const res = await fetch(url);
    const json = await res.json()
    const photos = json[0]

    return { photos }
}