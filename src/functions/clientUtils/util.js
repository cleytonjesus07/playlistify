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

export function shuffleArray(array) {
    const shuffledArray = [...array]; // Crie uma cópia do array original

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray; // Retorna o array embaralhado
}



export function setItemWithExpiry(key, value) {
    const now = new Date();
    const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000); // minutos para milissegundos

    const item = {
        value: value,
        expiry: expiry.getTime(),
    };

    localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
        return null; // O item não existe
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        /* localStorage.removeItem(key); */ // O item expirou, remova-o
        return null;
    }

    return item.value;
}