"use client"
import { GiLoveSong } from "react-icons/gi"
import { RiCloseLine } from "react-icons/ri"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCurrentSong } from "@/store/currentSong";
import { getTimesPlayedByCategoryId, getTimesPlayedBySongId, updateTimesPlayed } from "@/functions/api";
import get_dictionary from "../../../dictionaries/get_dictionary";

export default function AudioPlayer({ lang }) {
    const t = get_dictionary(lang);
    const [show, setShow] = useState(false);
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying } = useCurrentSong();
    const [sentApiRequest, setSentApiRequest] = useState(false);

    useEffect(() => {
        return () => {
            setCurrentSong(undefined);
            setShow(false);
        };
    }, [])


    useEffect(() => {
        setIsPlaying(false);
    }, [currentSong])

    if (typeof currentSong === "undefined") return;

    function handlePlay() {
        setIsPlaying(true)
    }

    function handlePause() {
        setIsPlaying(false)
    }

    async function handleEnd() {
        setIsPlaying(false);
        if (sentApiRequest) return;
        const data = {
            Song: {
                currentSongId: currentSong.Song.id,
                countSong: (await getTimesPlayedBySongId(currentSong.Song.id) + 1)
            },
            Category: {
                currentCategoryId: currentSong.Category.id,
                countCategory: (await getTimesPlayedByCategoryId(currentSong.Category.id) + 1)
            }
        }

        const res = await updateTimesPlayed(data)
        if (!res) {
            setSentApiRequest(false);
            return;
        };
        setSentApiRequest(true);
    }

    function handleCanPlay() {
        setShow(true);
    }

    return (
        <div className={`z-20 max-md:top-0 max-md:bottom-0 max-md:right-0 max-md:left-0 max-md:h-full max-md:max-h-full flex justify-center max-h-20 fixed bottom-0 bg-senary-color right-0 left-0`}>
            <button onClick={() => {
                setCurrentSong(undefined);
                setIsPlaying(false);
                setSentApiRequest(false);
            }} className="absolute right-1 top-1 opacity-50 hover:opacity-100 transition-all ease-in-out">
                <RiCloseLine className="w-6 h-6 text-white" />
            </button>

            <div className={`flex justify-center  py-2 max-w-[500px] max-md:justify-center max-md:items-center max-md:flex-col max-md:gap-5`}>
                {/* Conteudo centralizado */}
                <span className={`animate-pulse ml-5 font-extralight text-center text-xs max-md:text-3xl  ${show ? "hidden" : "flex"} text-white`}>{t.loading_message}</span>
                <div className={`${show ? "flex" : "hidden"} max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-5`}>
                    <div>
                        <span className={`flex overflow-hidden justify-center items-center bg-gray-900 w-16 h-16 max-md:w-64 max-md:h-64 rounded-full relative ${isPlaying && "animate-spin "}`}>
                            <span className="block z-30 bg-senary-color w-5 h-5 max-md:w-10 max-md:h-10 rounded-full border-solid border border-gray-400" ></span>
                            {currentSong?.Artist?.avatar && <Image alt={"artist image"} title={"artist image"} fill={true} size="100%" className="object-cover object-center" src={currentSong?.Artist?.avatar} />}
                        </span>
                    </div>
                    <div className=" flex flex-col justify-center items-center text-white max-md:gap-5">
                        <span className="flex gap-2 items-center max-md:text-xl max-md:text-center"><GiLoveSong />{currentSong?.Song?.title}</span>
                        <div className={`w-full h-full `}>
                            <audio onCanPlayThrough={handleCanPlay} onEnded={handleEnd} onPlay={handlePlay} onPause={handlePause} className={`scale-75 custom-audio max-md:scale-100`} controls src={currentSong?.Song?.url} />
                        </div>
                    </div>
                </div>
                {/* ---------------- */}
            </div>
        </div >
    )

}