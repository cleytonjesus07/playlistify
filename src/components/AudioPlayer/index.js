"use client"
import { RiCloseLine } from "react-icons/ri"
import { useState, useEffect, useRef } from "react";
import { useCurrentSong } from "@/store/currentSong";
import { getTimesPlayedByCategoryId, getTimesPlayedBySongId, updateTimesPlayed } from "@/functions/api";
import Player from "./player";
import get_dictionary from "../../../dictionaries/get_dictionary";


export default function AudioPlayer({ lang }) {
    const t = get_dictionary(lang)
    const audioRef = useRef();
    const { currentSong, setIndex } = useCurrentSong();
    const [isPaused, setIsPaused] = useState(true);
    const [sentApiRequest, setSentApiRequest] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [repeatPlaylist, setRepeatPlaylist] = useState(false);
    const [activeVolume, setActiveVolume] = useState(false);
    const [volume, setVolume] = useState(100);
    const [timer, setTimer] = useState({
        duration: 0,
        currentTime: 0,
        progress: 0
    })

    useEffect(() => {
        return () => {
            setActiveVolume(false);
            setIndex(undefined);
            handleApiRequest(false);
            setIsPaused(true);
            setRepeat(false);
        };
    }, [])

    useEffect(() => {
        setIsPaused(true);
    }, [currentSong])

    function handleApiRequest(sentApiRequest) {
        setSentApiRequest(sentApiRequest)
    }

    if (currentSong === undefined) return;

    return (
        <div className={`fixed  md:w-[16rem] player md:animate-toRight bottom-2  left-2  max-md:top-0 max-md:!bottom-0 max-md:right-0 max-md:left-0 max-md:h-full max-md:max-h-full`}>
            <div className={` h-full flex  justify-center bg-senary-color  p-2 rounded-md`}>
                <div className={`flex w-full py-2 max-w-[500px] max-md:justify-center max-md:items-center max-md:flex-col max-md:gap-5`}>
                    {/* Conteudo centralizado */}
                    <Player props={{
                        activeVolume,
                        setActiveVolume,
                        repeat,
                        setRepeat,
                        repeatPlaylist,
                        setRepeatPlaylist,
                        timer,
                        audioRef,
                        setTimer,
                        isPaused,
                        setIsPaused,
                        avatar: currentSong?.Artist?.avatar,
                        title: currentSong?.Song?.title,
                        sentApiRequest,
                        handleApiRequest,
                        t
                    }} />


                    {/* ---------------- */}
                    <TagAudio props={{
                        repeat,
                        audioRef,
                        isPaused,
                        setIsPaused,
                        src: currentSong?.Song?.url,
                        sentApiRequest,
                        handleApiRequest,
                        setTimer,
                        volume,
                        setIndex,
                        repeatPlaylist
                    }} />
                    <button onClick={() => {
                        setRepeat(false);
                        setRepeatPlaylist(false);
                        setActiveVolume(false);
                        setIndex(undefined);
                        handleApiRequest(false);
                        setIsPaused(true);
                        setTimer({ duration: 0, currentTime: 0, progress: 0 });
                    }} className="absolute right-1 top-1 opacity-50 hover:opacity-100 transition-all ease-in-out">
                        <RiCloseLine className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div >
            <div
                style={{ zIndex: -10 }}
                className={` 
                max-md:hidden
                absolute
                bottom-[50%]
                w-full
            ${activeVolume && "!bottom-[95%]"} 
            pb-5
            bg-senary-color
            transition-all
            ease-linear
            text-xs
            flex
            flex-col
            items-center
            justify-center
            text-white
            p-2
            rounded-t-md
            `
                }>
                <span>Volume</span>
                <div className="flex">
                    <span>{volume}%</span>
                    <input
                        value={volume}
                        min="0"
                        max="100"
                        step="1"
                        type="range"
                        className={`
                progressBar
                max-md:w-[20em]
                w-[15em]
                bg-transparent
                rounded-md
                flex-1
                `}
                        onChange={({ target: { value } }) => {
                            setVolume(parseInt(value))
                            audioRef.current.volume = value / 100;
                        }}
                    />
                    <span>100%</span>
                </div>
            </div>
        </div>
    )
}


function TagAudio({ props }) {
    const { playlist, index, currentSong } = useCurrentSong();

    const {
        repeat,
        audioRef,
        isPaused,
        setIsPaused,
        src,
        sentApiRequest,
        handleApiRequest,
        setTimer,
        volume,
        setIndex,
        repeatPlaylist
    } = props;

    async function handleEnd() {
        if (!sentApiRequest) {
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
                handleApiRequest(false);
                return;
            };
            handleApiRequest(true);
        }
    }

    useEffect(() => {
        isPaused ? audioRef.current.pause() : audioRef.current.play();
    }, [isPaused])
    useEffect(() => {
        audioRef.current.volume = volume / 100;
    }, [])




    return <audio
        ref={audioRef}
        onCanPlay={() => {
            /* Tocar automáticamente */
            if (repeatPlaylist || index !== undefined) {
                setIsPaused(false);
            }
        }}
        onTimeUpdate={({ target }) => {
            const currentTime = target.currentTime;
            const progress = (currentTime / target.duration) * 100;
            if (progress === 100) handleEnd();
            setTimer((old) => ({ ...old, currentTime, progress }));

        }}
        onLoadedMetadata={({ target }) => {
            setTimer({ duration: 0, currentTime: 0, progress: 0 });
            const duration = target.duration;
            setTimer(old => ({ ...old, duration }));
        }}
        onEnded={() => {
            if (repeatPlaylist && playlist !== undefined) {
                let nextIndex = ((index < playlist.length) ? (index + 1) : 0);
                setIndex(nextIndex);
            }
        }}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        className={`scale-75 custom-audio max-md:scale-100 hidden`}
        src={src}
        loop={repeat}
    />
}

