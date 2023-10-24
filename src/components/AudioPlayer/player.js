"use client"
import Image from "next/image";
import { GiLoveSong } from "react-icons/gi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import { BsFillFastForwardCircleFill, BsFillSkipBackwardCircleFill } from "react-icons/bs";
import { BiSolidVolumeFull } from "react-icons/bi";
import { LuRepeat1 } from "react-icons/lu";
import { useCurrentSong } from "@/store/currentSong";
export default function Player({ props }) {
    const { playlist, index } = useCurrentSong();

    const {
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
        avatar,
        title,
        t
    } = props;

    function formatarDuracao(duracaoEmSegundos) {
        return new Date(duracaoEmSegundos * 1000).toISOString().substr(11, 8);
    }

    return (
        <div className={`flex flex-col gap-5 items-center max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-5 `}>
            {(playlist) && (
                <div className="text-xs text-white block max-md:text-center max-md:text-sm py-2 whitespace-nowrap w-full overflow-hidden">
                    <span className="relative px-2 md:animate-movingToLeft">{(repeatPlaylist) ? `${t.Artistspage.player.next_song} ${playlist[(((index + 1) < playlist.length) ? (index + 1) : 0)].Song.title}` : ((index + 1) < playlist.length) ? `${t.Artistspage.player.next_song} ${playlist[(index + 1)].Song.title}` : ""}</span>
                </div>
            )}
            <div>
                <span className={`flex overflow-hidden justify-center items-center bg-gray-900 w-16 h-16 max-md:w-64 max-md:h-64 rounded-full relative ${!isPaused && "animate-spin "}`}>
                    <span className="block z-30 bg-senary-color w-5 h-5 max-md:w-10 max-md:h-10 rounded-full border-solid border border-gray-400" ></span>
                    {avatar && <Image alt={"artist image"} title={"artist image"} fill={true} size="100%" className="object-cover object-center" src={avatar} />}
                </span>
            </div>

            <div className="flex gap-2 justify-center  flex-col items-center  text-white max-md:gap-5">
                <span className="flex text-center gap-2 items-center max-md:text-xl max-md:text-center"><GiLoveSong />{title}</span>
                <div className="relative flex-1 flex items-center h-1 w-full bg-primary-color">
                    <span style={{ width: `${timer.progress || 0}%` }} className="bg-tertiary-color h-full block absolute"></span>
                    <input
                        min="0"
                        value={timer.progress || 0}
                        onChange={({ target: { value } }) => {
                            setTimer(old => {
                                const newPosition = (value * timer.duration) / 100;
                                audioRef.current.currentTime = newPosition;
                                return ({ ...old, currentTime: newPosition })
                            })
                        }}
                        type="range"

                        className={`
                        progressBar
                        max-md:w-[20em]
                        w-[15em]
                        h-1
                        bg-transparent
                        rounded-md
                        `}
                    />
                </div>
                <div className="text-xs flex justify-center gap-2">
                    <span>{formatarDuracao(timer.currentTime)}</span> / <span>{formatarDuracao(timer.duration)}</span>
                </div>
                <div className="grid grid-cols-6 max-md:grid-cols-5 justify-center w-full gap-5">
                    <BiSolidVolumeFull onClick={() => setActiveVolume(!activeVolume)} className={`max-md:hidden w-6 h-6 cursor-pointer ${!activeVolume && "opacity-50"} transition-opacity ease-in-out`} />
                    {(playlist.length > 1) ? (!repeat) ? (repeatPlaylist ? <TbRepeat onClick={() => setRepeatPlaylist(false)} className="w-6 h-6 cursor-pointer transition-opacity opacity-100 hover:opacity-100 ease-in-out" /> : <TbRepeatOff onClick={() => setRepeatPlaylist(true)} className="w-6 h-6 cursor-pointer transition-opacity opacity-50 hover:opacity-100 ease-in-out" />) : "" : ""}
                    <BsFillSkipBackwardCircleFill onClick={() => audioRef.current.currentTime -= 20} className="w-6 h-6 cursor-pointer transition-opacity opacity-50 hover:opacity-100 ease-in-out" />
                    <div className="scale-150">
                        {isPaused ? <AiFillPlayCircle onClick={() => setIsPaused(false)} className="w-6 h-6 cursor-pointer transition-opacity opacity-50 hover:opacity-100 ease-in-out" /> : <AiFillPauseCircle onClick={() => setIsPaused(true)} className="w-6 h-6 cursor-pointer transition-opacity opacity-50 hover:opacity-100 ease-in-out" />}
                    </div>
                    <BsFillFastForwardCircleFill onClick={() => audioRef.current.currentTime += 20} className="w-6 h-6 cursor-pointer opacity-50 hover:opacity-100 transition-opacity ease-in-out" />
                    <LuRepeat1 onClick={() => setRepeat(!repeat)} className={`w-6 h-6 cursor-pointer ${repeat ? "opacity-100" : "opacity-50"} transition-opacity ease-in-out ${repeatPlaylist && "hidden"}`} />
                </div>
            </div>
        </div>
    )
}