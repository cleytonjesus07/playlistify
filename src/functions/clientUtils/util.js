import { decodeURL, encodeURL } from "../serverUtils/utils";

const keyStorage = "favoritesSongs";
export const saveFavoriteSongsIds = (data) => {
    localStorage.setItem(keyStorage, encodeURL(JSON.stringify(data)));
    return;
}

export const getFavoriteSongsIds = () => {
    const data = localStorage.getItem(keyStorage);
    if (!data) return null;
    return JSON.parse(decodeURL(data));
}