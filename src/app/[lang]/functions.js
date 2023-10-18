import { getSongs } from "@/functions/api";

export async function getAllSongs() {
    const res1 = await getSongs();
    return res1.map(({ id_song, times_played, title_song, url_song, Composers: { id_composer, image_composer, name_composer }, Categories: { id_category } }) => ({
        Song: {
            id: id_song,
            title: title_song,
            url: url_song,
            countPlayed: times_played
        },
        Artist: {
            id: id_composer,
            avatar: image_composer,
            name: name_composer
        },
        Category: {
            id: id_category
        }
    })) || null;
}

export async function mostListening() {
    const songs = await getAllSongs();
    const topthree = songs.filter(({ Song }) => Song.countPlayed > 0).sort((a, b) => b.Song.countPlayed - a.Song.countPlayed).slice(0, 3);
    if (topthree.length <= 0) return null;
    return topthree;
}


