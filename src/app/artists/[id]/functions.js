import { getAllSongs } from "@/app/funtions";
import { getArtists } from "@/functions/api";
import { decodeURL } from "@/functions/serverUtils/utils";
import { getAllArtists } from "../functions";

export async function getAllArtistSongs(id_artist) {
    const res1 = await getAllSongs();
    return res1.filter(({ Artist }) => Artist.id == decodeURL(id_artist)) || null;
}

export async function getSongById(id_artist, id_song) {
    let songs = await getAllArtistSongs(id_artist);
    return songs.filter(({ Song }) => Song.id === decodeURL(id_song))[0] || null;
}

export async function getInfoArtist(id_artist) {
    let artist = await getAllArtists();
    artist = artist.filter((artist) => artist.id == decodeURL(id_artist))[0] || null;
    if (!artist) return artist;

    return {
        id: artist.id,
        avatar: artist.avatar,
        name: artist.name,
        Songs: artist.Songs
    }
}
