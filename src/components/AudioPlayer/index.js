"use client"
import { GiLoveSong } from "react-icons/gi"
import { RiCloseLine } from "react-icons/ri"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCurrentSong } from "@/store/currentSong";
import { getTimesPlayedBySongId, updateTimesPlayed } from "@/functions/api";




export default function AudioPlayer() {
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying } = useCurrentSong();
    const [sentApiRequest, setSentApiRequest] = useState(false);



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
        let count = await getTimesPlayedBySongId(currentSong.Song.id);
        count += 1;
        const res = await updateTimesPlayed({ id: currentSong.Song.id, count });
        if (!res) {
            console.log("Não Foi")
            setSentApiRequest(false);
            return;
        };
        console.log("Foi")
        setSentApiRequest(true);
    }

    return (
        <div className=" flex justify-center max-h-20 fixed bottom-0 bg-senary-color right-0 left-0">
            <button onClick={() => {
                setCurrentSong(undefined);
                setIsPlaying(false);
                setSentApiRequest(false);
            }} className="absolute right-1 top-1 opacity-50 hover:opacity-100 transition-all ease-in-out">
                <RiCloseLine className="w-6 h-6 text-white" />
            </button>
            <div className="flex justify-center py-2 max-w-[500px]">
                {/* Conteudo centralizado */}
                <div>
                    <span className={`flex overflow-hidden justify-center items-center bg-gray-900 w-16 h-16 rounded-full relative ${isPlaying && "animate-spin "}`}>
                        <span className="block z-30 bg-senary-color w-5 h-5 rounded-full border-solid border border-gray-400" ></span>
                        {currentSong?.Artist?.avatar && <Image alt={"artist image"} title={"artist image"} fill={true} size="100%" className="object-cover object-center" src={currentSong?.Artist?.avatar} />}
                    </span>
                </div>
                <div className=" flex flex-col justify-center items-center text-white">
                    <span className="flex gap-2 items-center line-clamp-1"><GiLoveSong />{currentSong?.Song?.title}</span>
                    <div className="w-full h-full">
                        <audio onEnded={handleEnd} onPlay={handlePlay} onPause={handlePause} className="scale-75 custom-audio" controls src={currentSong?.Song?.url} />
                    </div>
                </div>
                {/* ---------------- */}
            </div>
        </div >
    )

}