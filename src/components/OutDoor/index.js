"use client"
import { encodeURL } from "@/functions/serverUtils/utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { getItemWithExpiry, setItemWithExpiry } from "@/functions/clientUtils/util";
import Loading from "@/app/[lang]/loading";
import get_dictionary from "../../../dictionaries/get_dictionary";
const key = "ArtistOfTheDay";

function selectRandomArtist(artist) {
    const randomArtist = artist[Math.floor(Math.random() * artist.length)];
    return randomArtist;
}
export default function OutDoor({ artists, lang }) {
    const t = get_dictionary(lang);
    const [artistOfTheDay, setArtistOfTheDay] = useState(undefined)
    useEffect(() => {
        const getData = getItemWithExpiry(key);
        if (getData !== null) {
            setArtistOfTheDay(getData);
        } else {
            const artist = selectRandomArtist(artists);
            setItemWithExpiry(key, artist);
            setArtistOfTheDay(artist);
        }
    }, [])


    if (typeof artistOfTheDay === "undefined") return <Loading />

    return (
        <Link href={`/${lang}/artists/${encodeURL(artistOfTheDay.id)}`}>
            <div style={{ backgroundImage: "url(" + artistOfTheDay.avatar + ")" }} className="relative flex justify-center items-center w-full h-60 rounded-xl border-8 border-solid border-senary-color bg-senary-color max-md:flex bg-top bg-cover bg-no-repeat max-md:bg-[100%]">
                <div className="z-10 flex h-full w-full">
                    <div className="relative w-60 h-full max-md:hidden">
                        <Image alt={artistOfTheDay.name} src={artistOfTheDay.avatar} fill={true} className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center max-md:text-center ">
                        <span className="text-white font-light mr-10 max-md:mr-0">{t.Homepage.outdoor_message}</span>
                        <h3 className="text-white font-bold text-4xl max-md:text-2xl">{artistOfTheDay.name}</h3>
                    </div>
                </div>
                <div className="absolute opacity-60 bg-black w-full h-full"></div>
            </div >
        </Link>
    )
}