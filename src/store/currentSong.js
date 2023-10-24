"use client"
import { create } from "zustand"

export const useCurrentSong = create((set, get) => ({
    playlist: undefined,
    index: undefined,
    currentSong: undefined,
    setCurrentSong: (index) => {
        /* if ((typeof get().currentSong !== "undefined" && typeof currentSong !== "undefined") && get().currentSong.Song.id === currentSong.Song.id) return;*/
        const currentSong = (typeof get().playlist !== "undefined" || index !== undefined) ? get().playlist[index] : undefined;
        set(state => ({ ...state, currentSong, index }));
    },
    setIndex: (index) => {
        if (typeof get().playlist === "undefined" || index === undefined) return get().setCurrentSong(undefined);
        if (index < get().playlist.length) {
            get().setCurrentSong(index);
        } else {
            get().setCurrentSong(0);
        }

    },
    setPlaylist: (songs) => { set(state => ({ ...state, playlist: songs })) }
}))



