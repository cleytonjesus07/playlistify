"use client"
import { useAtom } from "jotai";
import ListItem from "./listItem";
import { playlist } from "@/Jotai/Atoms/songs";
import { useEffect } from "react";

export default function ListSongs({ composerData, isThereSongId }) {
    const [_, setAtomPlaylist] = useAtom(playlist);
    const { id_composer, name_composer, image_composer, Songs } = composerData
    const isThereSongIndex = Songs.findIndex(({ id_song }) => id_song === isThereSongId);
    useEffect(() => {
        if (isThereSongIndex === -1) return;
        setAtomPlaylist({
            artist: {
                id: id_composer,
                name: name_composer,
                image: image_composer
            },
            songs: Songs,
            index: isThereSongIndex,
            isPlaying: true,
            canIRepeat: { playlist: false, song: false },
            random: false
        })
    }, [])
    const handleChoiceSong = (i) => {
        setAtomPlaylist({
            artist: {
                id: id_composer,
                name: name_composer,
                image: image_composer
            },
            songs: Songs,
            index: i,
            isPlaying: false,
            canIRepeat: { playlist: false, song: false },
            random: false
        })
    }
    return (
        <section className="pt-5">
            <ul className="grid grid-cols-3 max-md:grid-cols-1 px-5 gap-5">
                {composerData.Songs.map(({ id_song, title_song }, i) => (
                    <ListItem handleChoiceSong={handleChoiceSong} key={id_song} i={i} id_song={id_song} isThereSongId={isThereSongId} title_song={title_song} />
                ))}
            </ul>
        </section>
    )
}