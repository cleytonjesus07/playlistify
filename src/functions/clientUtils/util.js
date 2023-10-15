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