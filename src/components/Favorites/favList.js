"use client"
import Link from "next/link";
import { FaHeartBroken } from "react-icons/fa"
import Container from "@/components/Container";
import { encodeURL } from "@/functions/serverUtils/utils";
import { getFavoriteSongsIds } from "@/functions/clientUtils/util";
import { useEffect, useState } from "react";
import Loading from "../../app/loading";


export default function FavList({ songs }) {
    const [favoritesIds, setFavoriteIds] = useState(undefined);

    useEffect(() => {
        setFavoriteIds(getFavoriteSongsIds());
    }, [])

    if (typeof favoritesIds === "undefined") return <Loading />;

    return (
        <>
            {(!favoritesIds?.length)
                ?
                (<span className="flex justify-center p-5 text-center text-lg text-senary-color bg-primary-color rounded-full"><FaHeartBroken className="w-6 h-6 mr-5" /> Você ainda não selecionou nenhuma música como favorita</span>)
                :
                (
                    songs?.filter(({ Song }) => favoritesIds?.includes(Song.id))?.map(({ Song: { id, title }, Artist }, i) => (
                        <Link key={id} href={`/artists/${encodeURL(Artist.id)}-${encodeURL(id)}`}>
                            <Container className={`flex flex-1 items-center cursor-pointer gap-5 rounded-xl overflow-hidden scale-95 transition-all ease-in-out  hover:bg-senary-color hover:scale-100 group`}>
                                < div className="bg-senary-color p-5 text-white">{i + 1}</div>
                                <div className={`flex-1 text-senary-color group-hover:text-white line-clamp-1`}>{title}</div>
                            </Container>
                        </Link>
                    )
                    )
                )
            }
        </>
    )
}