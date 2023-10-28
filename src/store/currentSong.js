"use client"
import { create } from "zustand"

export const useCurrentSong = create((set, get) => ({
    playlist: undefined,
    index: undefined,
    currentSong: undefined,
    currentArtist: undefined,
    setCurrentArtist: (currentArtist) => set(state => ({ ...state, currentArtist })),
    setCurrentSong: (index) => {
        const currentSong = (typeof get().playlist !== "undefined" || index !== undefined) ? get().playlist[index] : undefined;
        set(state => ({ ...state, currentSong, index }));
    },
    setIndex: (index) => {
        get().setCurrentSong((index === undefined || get().playlist === undefined) ? undefined : (index < get().playlist.length) ? index : 0);
    },
    setPlaylist: (songs) => { set(state => ({ ...state, playlist: songs })) }
}))



