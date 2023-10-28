"use client"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { useState, useEffect } from "react"
import Container from "@/components/Container"
import { useCurrentSong } from "@/store/currentSong"
import { getFavoriteSongsIds, removeLocalstorageItem, saveFavoriteSongsIds } from "@/functions/clientUtils/util"

export default function Playlist({ artistSelected: { name }, songs, songRequired }) {
    const { currentArtist, setCurrentArtist, setPlaylist, currentSong, setCurrentSong, setIndex } = useCurrentSong();
    const [isFavorite, setIsFavorite] = useState([]);

    useEffect(() => {
        if (currentArtist === undefined || currentArtist.name !== name) {
            setPlaylist(songs);
            setCurrentArtist(name);
            setCurrentSong(undefined);
            setIndex(undefined);
        }
        if (typeof songRequired !== "undefined") {
            setIndex(songRequired)
        };

        const idsSongs = getFavoriteSongsIds();
        if (!idsSongs) return;
        setIsFavorite(idsSongs);
    }, [])



    function handleFavorite(id_song) {
        const data = [id_song, ...isFavorite];
        saveFavoriteSongsIds(data);
        setIsFavorite(data);
    }

    function handleRemoveFavorite(id_song) {
        const data = isFavorite.filter((favId) => favId !== id_song);
        setIsFavorite(data);
        (!data.length) ? removeLocalstorageItem() : saveFavoriteSongsIds(data);

    }

    function handleChoiceSong(index) {
        setIndex(index);
    }

    if (!songs) return (
        <Container className={`flex p-5 justify-center overflow-hidden`}>
            <div className={` text-senary-color`}>O artista{`(${name})`} não possui músicas para serem listadas.</div>
        </Container>
    )

    return (
        songs?.map(({ Song }, i) => (
            < li key={Song.id} className={`flex gap-1 items-center `}  >
                <div className={`flex-1 scale-95 transition-all ease-in-out  ${(currentSong?.Song?.id == Song.id) && "!scale-100"}`} onClick={() => handleChoiceSong(i)}>
                    <Container className={`flex flex-1 items-center cursor-pointer  gap-5 rounded-xl overflow-hidden  ${(currentSong?.Song?.id == Song.id) && "scale-100 bg-senary-color"}`}>
                        < div className="bg-senary-color p-5 text-white">{i + 1}</div>
                        <div className={`flex-1 ${(currentSong?.Song?.id == Song.id) ? "text-white" : "text-senary-color"}`}>{Song.title}</div>
                        {/* WaveSound */}
                        {((currentSong?.Song?.id === Song.id)) && (
                            <div className="flex gap-1 justify-self-end p-5 scale-75 soundWave">
                                <span className=" block w-2 h-7 bg-white rounded-full box box1"></span>
                                <span className=" block w-2 h-7 bg-white rounded-full box box2"></span>
                                <span className=" block w-2 h-7 bg-white rounded-full box box3"></span>
                                <span className=" block w-2 h-7 bg-white rounded-full box box4"></span>
                                <span className=" block w-2 h-7 bg-white rounded-full box box5"></span>
                            </div>
                        )}
                        {/* ---------- */}
                    </Container>
                </div >
                {((isFavorite?.indexOf(Song.id) > -1))
                    ?
                    (
                        <button onClick={() => handleRemoveFavorite(Song.id)} className={` w-10 h-10 flex justify-center items-center rounded-xl transition-all ease-in-out bg-senary-color`}>
                            <AiFillStar className="w-6 text-white h-6 " />
                        </button>
                    )
                    :
                    (
                        <button onClick={() => handleFavorite(Song.id)} className={` w-10 h-10 flex justify-center items-center rounded-xl transition-all ease-in-out bg-white`}>
                            <AiOutlineStar className="w-6 text-senary-color h-6 " />
                        </button>

                    )
                }
            </li >
        ))
    )
}
