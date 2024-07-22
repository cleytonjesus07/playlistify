"use client"
import { playlist } from "@/Jotai/Atoms/songs";
import { useAtom } from "jotai"
import Image from "next/image";
import { useRef } from "react";
import { GoPlay } from "react-icons/go"
import { LiaRandomSolid } from "react-icons/lia"
import { IoVolumeHighOutline, IoVolumeLowOutline } from "react-icons/io5"
import { TfiLoop } from "react-icons/tfi"
import { PiRepeatOnce } from "react-icons/pi"
import { IoPauseCircleOutline } from "react-icons/io5"
import { TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from "react-icons/tb"
import LikeButton from "./LikeButton";
export default function Footer() {
    let finalDurationSongRef = useRef(),
        startDurationSongRef = useRef(),
        audioPlayerRef = useRef(),
        rangeBarRef = useRef();
    const [atomPlaylist, setAtomPlaylist] = useAtom(playlist);

    if (atomPlaylist === null) return;

    const handleClosePlayer = () => setAtomPlaylist(null);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        const formattedHours = h > 0 ? h.toString().padStart(2, '0') + ':' : '';
        const formattedMinutes = m.toString().padStart(2, '0') + ':';
        const formattedSeconds = s.toString().padStart(2, '0');

        return formattedHours + formattedMinutes + formattedSeconds;
    }
    const handleStartDurationSong = (e) => {
        const duration = e.target.currentTime;
        const formattedDuration = formatTime(duration);
        rangeBarRef.current.value = Math.floor((e.target.currentTime / e.target.duration) * 100);
        startDurationSongRef.current.textContent = formattedDuration;
    }
    const handleFinalDurationSong = (e) => {

        const duration = e.target.duration;
        const formattedDuration = formatTime(duration);
        finalDurationSongRef.current.textContent = formattedDuration;
    }
    const handleUpdateTime = (e) => {
        const newPosition = (e.target.value * audioPlayerRef.current.duration) / 100;
        audioPlayerRef.current.currentTime = newPosition;
    }
    const handleBtnFunctions = (option) => {
        const timeToSkip = 15;
        switch (option) {
            case "play":
                audioPlayerRef.current.play();
                setAtomPlaylist(old => ({ ...old, isPlaying: true }));
                break;
            case "pause":
                audioPlayerRef.current.pause();
                setAtomPlaylist(old => ({ ...old, isPlaying: false }));
                break;
            case "backward":
                audioPlayerRef.current.currentTime = (audioPlayerRef.current.currentTime - timeToSkip);
                break;
            case "forward":
                audioPlayerRef.current.currentTime = (audioPlayerRef.current.currentTime + timeToSkip);
                break;
            case "repeatSong":

                setAtomPlaylist(old => ({ ...old, canIRepeat: { ...old.canIRepeat, song: !old.canIRepeat.song } }));
                break;
            case "repeatPlaylist":
                setAtomPlaylist(old => ({ ...old, canIRepeat: { ...old.canIRepeat, playlist: !old.canIRepeat.playlist } }))
                setAtomPlaylist(old => ({ ...old, canIRepeat: { ...old.canIRepeat, song: false } }));
                setAtomPlaylist(old => ({ ...old, random: false }));
                break;
            case "random":

                setAtomPlaylist(old => ({ ...old, random: !old.random }));
                break;
            default:
                break;
        }
    }

    const handleEnded = () => {
        if (atomPlaylist?.canIRepeat.song) {
            audioPlayerRef.current.currentTime = 0;
            audioPlayerRef.current.play();
            return;
        }
        const getRandomIndex = () => {
            const randomIndex = Math.floor(Math.random() * (atomPlaylist?.songs.length));
            return randomIndex;
        }

        if (!atomPlaylist?.canIRepeat.playlist) {
            setAtomPlaylist(old => ({ ...old, isPlaying: false }));
            return;
        }

        if (atomPlaylist?.random) {
            const randomIndex = getRandomIndex();
            if (randomIndex === atomPlaylist?.index) {
                audioPlayerRef.current.currentTime = 0;
                audioPlayerRef.current.play();
                return;
            }

            setAtomPlaylist(old => ({ ...old, index: randomIndex }))
            return;
        }


        (atomPlaylist.index < (atomPlaylist.songs.length - 1))
            ? setAtomPlaylist(old => ({ ...old, index: old.index + 1 }))
            : setAtomPlaylist(old => ({ ...old, index: 0 }));

        setAtomPlaylist(old => ({ ...old, isPlaying: true }));
    }
    const handleCanPlay = () => {
        setAtomPlaylist(old => ({ ...old, isPlaying: true }));
        audioPlayerRef.current.play();
    }
    const handleVolume = (e) => {
        const { value } = e.target;
        const volume = (value / 100);
        audioPlayerRef.current.volume = volume;
    }

    return (
        <div className="bg-[#1e1e1e]  fixed bottom-0 right-0 left-0 h-20 max-md:h-full max-md:flex-col max-md:justify-center max-md:space-y-5 z-10 flex justify-between px-5 py-2">
            <button className="absolute -top-6 right-0 bg-[#1e1e1e] px-5 rounded-tl-md rounded-tr-md max-md:top-3 max-md:text-xl" onClick={handleClosePlayer}>X</button>

            <div className="flex gap-5  items-center max-md:flex-col">
                {/* imagem e nome da música */}
                <Image alt={`Imagem de capa de ${atomPlaylist?.artist?.name}`} src={atomPlaylist?.artist?.image ?? "/"} width={0} height={0} sizes="100vw" className="w-14 h-14 max-md:w-full max-md:max-w-[300px] max-md:h-full shadow object-cover shadow-[#fff]" priority />
                <div className="flex flex-col">
                    <span className="text-[#fff] text-sm">{atomPlaylist?.songs[atomPlaylist.index]?.title_song}</span>
                    <i className="max-md:text-center text-xs">{atomPlaylist?.artist?.name}</i>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center space-y-2">
                <div className="flex gap-5 justify-center max-md:[&>button>*]:size-10 max-md:my-5 [&>button>span]:max-md:hidden">
                    {atomPlaylist?.canIRepeat.playlist
                        ? <button className="relative flex flex-col items-center justify-center" onClick={() => handleBtnFunctions("random")}><LiaRandomSolid className={`size-4 ${atomPlaylist?.random && "text-[#1ED760]"} `} /> {atomPlaylist?.random && <span className="block absolute bottom-0  bg-[#1ED760] w-1 h-1 rounded-full"></span>}</button>
                        : <button className="relative flex flex-col items-center justify-center" onClick={() => handleBtnFunctions("repeatSong")}><PiRepeatOnce className={`size-4 ${atomPlaylist?.canIRepeat.song && "text-[#1ED760]"} `} /> {atomPlaylist?.canIRepeat.song && <span className="block absolute bottom-0  bg-[#1ED760] w-1 h-1 rounded-full"></span>}</button>}
                    <button onClick={() => handleBtnFunctions("backward")}><TbPlayerSkipBackFilled className="size-4" /></button>
                    {atomPlaylist?.isPlaying ? <button onClick={() => handleBtnFunctions("pause")}><IoPauseCircleOutline className="size-8" /></button> : <button onClick={() => handleBtnFunctions("play")}><GoPlay className="size-8" /></button>}
                    <button onClick={() => handleBtnFunctions("forward")}><TbPlayerSkipForwardFilled className="size-4" /></button>
                    <button className="relative flex flex-col items-center justify-center" onClick={() => handleBtnFunctions("repeatPlaylist")}><TfiLoop className={`size-4 ${atomPlaylist?.canIRepeat.playlist && "text-[#1ED760]"} `} /> {atomPlaylist?.canIRepeat.playlist && <span className="block absolute bottom-0  bg-[#1ED760] w-1 h-1 rounded-full"></span>}</button>
                    <LikeButton />


                </div>
                <div className="text-xs flex justify-center items-center gap-5 ">
                    {/* Barra de progresso */}
                    <span ref={startDurationSongRef}>00:00</span>
                    {/* Agora quero avançar e retorna um pouco no progresso da musica */}
                    <input ref={rangeBarRef} className="h-1 w-[500px] max-md:w-[200px] max-md:h-2" onChange={handleUpdateTime} type="range" />
                    <audio ref={audioPlayerRef} className="hidden" onCanPlay={handleCanPlay} onLoadStart={() => rangeBarRef.current.value = 0} onEnded={handleEnded} onTimeUpdate={handleStartDurationSong} onLoadedMetadata={handleFinalDurationSong} controls src={atomPlaylist?.songs[atomPlaylist.index]?.url_song}></audio>
                    <span ref={finalDurationSongRef}>00:00</span>
                </div>
            </div>
            <div className=" flex gap-2 items-center px-2 max-md:justify-center">
                {/* volume */}
                <IoVolumeLowOutline className={`size-5`} />
                <input min={0} max={100} defaultValue={100} onChange={handleVolume} className="h-1 max-md:h-2" type="range"></input>
                <IoVolumeHighOutline className="size-5" />
            </div>
        </div>
    )
}