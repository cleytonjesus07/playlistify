import { getArtists } from "@/functions/api";

export async function getAllArtists() {
    const res3 = await getArtists();
    return res3.map(({ id_composer, name_composer, image_composer, Songs }) => ({
        id: id_composer,
        avatar: image_composer,
        name: name_composer,
        Songs
    }));
}