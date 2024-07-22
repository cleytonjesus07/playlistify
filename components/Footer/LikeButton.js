import { playlist } from "@/Jotai/Atoms/songs";
import { useAtom } from "jotai";
import { useEffect, useReducer } from "react";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";

export default function LikeButton() {
    const [_, setRender] = useReducer(n => n + 1, 0);
    const [atomPlaylist] = useAtom(playlist);
    useEffect(() => {
        if (localStorage.getItem("favorites") === null) {
            localStorage.setItem("favorites", "[]");
            return;
        }

    }, [])
    const handleLike = (option) => {
        let favSongs = JSON.parse(localStorage.getItem("favorites"));
        const currentSong = {
            artist: {
                id: atomPlaylist?.artist?.id,
                name: atomPlaylist?.artist?.name
            },
            song: {
                id: atomPlaylist?.songs[atomPlaylist?.index].id_song,
                name: atomPlaylist?.songs[atomPlaylist?.index].title_song
            }
        };

        switch (option) {
            case "like":
                favSongs.push(currentSong);
                localStorage.setItem("favorites", JSON.stringify(favSongs));
                break;
            case "unlike":
                favSongs = favSongs.filter(cs => cs.song.id !== currentSong.song.id)
                localStorage.setItem("favorites", JSON.stringify(favSongs));
                break;
            default:
                break;
        }
        setRender()
    }
    return (
        (typeof JSON.parse(localStorage.getItem("favorites"))?.find(cs => cs.song.id === atomPlaylist?.songs[atomPlaylist?.index].id_song) === "undefined")
            ? <button title="Like button" className="relative flex flex-col items-center justify-center" onClick={() => handleLike("like")}><RiHeart3Line className={`size-4`} /></button>
            : <button title="Unlike button" className="relative flex flex-col items-center justify-center" onClick={() => handleLike("unlike")}><RiHeart3Fill className={`size-4 text-[#1ED760]`} /></button>
    )
}