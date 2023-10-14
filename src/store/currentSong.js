"use client"
import { create } from "zustand"

export const useCurrentSong = create((set, get) => ({
    currentSong: undefined,
    isPlaying: false,
    setCurrentSong: (currentSong) => {
        if ((typeof get().currentSong !== "undefined" && typeof currentSong !== "undefined") && get().currentSong.Song.id === currentSong.Song.id) return;
        set(state => ({ ...state, currentSong }))
    },
    setIsPlaying: (isPlaying) => { set(state => ({ ...state, isPlaying })) }
}))



