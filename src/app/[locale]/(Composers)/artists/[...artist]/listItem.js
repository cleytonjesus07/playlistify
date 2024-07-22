import { playlist } from "@/Jotai/Atoms/songs"
import { useAtom } from "jotai"
import { GiMusicalNotes } from "react-icons/gi"

export default function ListItem({ id_song, title_song, i, handleChoiceSong }) {
    const [atomPlaylist] = useAtom(playlist);
    return (
        <li key={id_song} onClick={() => handleChoiceSong(i)}>
            <div className={`bg-[#242424] ${id_song === atomPlaylist?.songs[atomPlaylist.index]?.id_song && "!bg-unselected"} relative flex rounded-md w-full overflow-hidden items-center [&]:hover:bg-[rgb(73,73,73)] transition-colors [&>div:nth-child(2)]:hover:text-[#FFF] cursor-pointer h-20`}>
                <span className={`bg-unselected ${id_song === atomPlaylist?.songs[atomPlaylist.index]?.id_song && "!bg-[#242424] !text-unselected"} absolute top-0 text-[#242424] font-extrabold px-3 text-sm rounded-br-md`}>{i + 1}</span>
                <div className={`flex-1 ml-4 font-extrabold ${id_song === atomPlaylist?.songs[atomPlaylist?.index]?.id_song && "!text-[#242424]"}`}>
                    {title_song}
                </div>
                <GiMusicalNotes className={`absolute opacity-40  right-0 w-auto h-full  ${(id_song === atomPlaylist?.songs[atomPlaylist.index]?.id_song) && `text-[#242424] ${atomPlaylist?.isPlaying && "animate-bounce"}`}`} />
            </div>
        </li>
    )
}