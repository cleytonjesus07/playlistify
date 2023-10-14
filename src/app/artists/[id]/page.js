import Image from "next/image";
import Playlist from "./playlist";
import { redirect } from "next/navigation";
import { getAllArtistSongs, getInfoArtist, getSongById } from "./functions";

export default async function Songs({ params }) {
    const [id_artist, id_song] = params.id.split("-");
    const artistSelected = await getInfoArtist(id_artist), songs = await getAllArtistSongs(id_artist);
    const songRequired = typeof id_song !== "undefined" ? await getSongById(id_artist, id_song) : undefined;
    if (!artistSelected) redirect("/");

    return (
        <>
            <section className="flex">
                <div className="relative w-80 h-60 rounded-xl overflow-hidden border-8 border-solid border-senary-color bg-senary-color">
                    <Image alt="Composer image" priority={true} src={artistSelected.avatar} fill={true} sizes="100%" className="object-cover object-center" />
                </div>
                <div className="flex-1 flex justify-center items-center flex-col gap-2">
                    <span className="text-3xl text-senary-color">Artista</span>
                    <span className="text-5xl text-senary-color font-extrabold">{artistSelected.name}</span>
                </div>
            </section>
            <section className="w-full mt-5">
                <ul className="flex flex-col gap-5">
                    <Playlist artistSelected={artistSelected} songs={songs} songRequired={songRequired} />
                </ul>
            </section >
        </>
    )
}

export const revalidate = 0;

