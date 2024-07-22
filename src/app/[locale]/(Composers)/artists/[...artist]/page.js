import { getComposer, getSongsByComposer } from "@/supabase";
import Image from "next/image";
import ListSongs from "./listSongs";
export async function generateMetadata({ params: { artist } }) {
    const id = artist[0].split("~")[0];
    const { name_composer: title } = await getComposer(id);
    return { title }
}

export default async function ArtistPage({ params: { artist } }) {
    const [artistId, isThereSongId] = artist[0].split("~");
    const composerData = await getSongsByComposer(artistId);

    return (
        <div>
            <section className="w-full h-64 relative">
                <div className="flex items-end w-full h-full bg-[#000000a6] absolute pl-5 ">
                    <h1 className="text-[#fff] select-none text-8xl max-md:text-5xl font-extrabold mb-14">{composerData.name_composer}</h1>
                </div>
                <Image alt={`Imagem de capa de ${composerData.name_composer}`} src={composerData.image_composer} priority width={0} height={0} sizes="100vw" className="w-full h-full object-cover" />
            </section>
            <ListSongs composerData={composerData} isThereSongId={isThereSongId} />
        </div>
    )
}