"use client"
import Link from "next/link";
import { FaHeartBroken } from "react-icons/fa"
import Container from "@/components/Container";
import { encodeURL } from "@/functions/serverUtils/utils";
import { getFavoriteSongsIds } from "@/functions/clientUtils/util";
import { useEffect, useState } from "react";

import get_dictionary from "../../../dictionaries/get_dictionary";
import Loading from "@/app/[lang]/loading";
import { useCurrentSong } from "@/store/currentSong";


export default function FavList({ songs, lang }) {
    const { setPlaylist, setCurrentArtist, currentSong, setCurrentSong } = useCurrentSong();
    const t = get_dictionary(lang);
    const [favoritesSongs, setFavoriteSongs] = useState(undefined);

    useEffect(() => {
        const favIds = getFavoriteSongsIds();
        const favSongs = songs.filter(({ Song: { id } }) => favIds?.includes(id));
        setPlaylist(favSongs);
        setFavoriteSongs(favSongs);
        return () => {
            setCurrentSong(undefined);
        }
    }, [])

    function handleChoiceSong(index, Artist) {
        setCurrentArtist(Artist);
        setCurrentSong(index);
    }

    if (typeof favoritesSongs === "undefined") return <Loading />;

    return (
        <>
            {(!favoritesSongs?.length)
                ?
                (<span className="flex justify-center p-5 text-center text-lg text-senary-color bg-primary-color rounded-full"><FaHeartBroken className="w-6 h-6 mr-5 max-sm:hidden" />{t.Favoritespage.empty_message}</span>)
                :
                (
                    favoritesSongs.map(({ Song: { id, title }, Artist }, i) => (
                        <div key={id} onClick={() => handleChoiceSong(i, Artist)} className={`flex-1 scale-95 transition-all ease-in-out  ${(currentSong?.Song?.id == id) && "!scale-100"}`} >
                            <Container className={`flex flex-1 items-center cursor-pointer  gap-5 rounded-xl overflow-hidden  ${(currentSong?.Song?.id == id) && "scale-100 bg-senary-color"}`}>
                                < div className="bg-senary-color p-5 text-white">{i + 1}</div>
                                <div className={`flex-1 ${(currentSong?.Song?.id == id) ? "text-white" : "text-senary-color"}`}>{title}</div>
                                {((currentSong?.Song?.id === id)) && (
                                    <div className="flex gap-1 justify-self-end p-5 scale-75 soundWave">
                                        <span className=" block w-2 h-7 bg-white rounded-full box box1"></span>
                                        <span className=" block w-2 h-7 bg-white rounded-full box box2"></span>
                                        <span className=" block w-2 h-7 bg-white rounded-full box box3"></span>
                                        <span className=" block w-2 h-7 bg-white rounded-full box box4"></span>
                                        <span className=" block w-2 h-7 bg-white rounded-full box box5"></span>
                                    </div>
                                )}
                            </Container>
                        </div>
                    ))
                )
            }
        </>
    )
}