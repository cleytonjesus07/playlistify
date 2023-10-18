import React from "react"
import Image from "next/image";
import Link from "next/link";
import { FaCrown } from "react-icons/fa6"
import { GiNightSleep } from "react-icons/gi"
import Container from "@/components/Container";
import { encodeURL } from "@/functions/serverUtils/utils";
import get_dictionary from "../../../dictionaries/get_dictionary";

export default async function MostListening({ mostListening, lang }) {
    const t = get_dictionary(lang)
    const topthree = await mostListening();
    return (
        <>
            {(!topthree) ?
                <span className="text-senary-color font-extrabold flex items-center gap-2"><GiNightSleep className="w-6 h-6" />{t.Homepage.most_listening.info}</span>
                :
                (
                    topthree?.map(({ Song, Artist }, i) => {
                        return (
                            <Link key={Artist.id} href={`/${lang}/artists/${encodeURL(Artist.id)}-${encodeURL(Song.id)}`} >
                                <Container className={"flex relative  hover:scale-100 scale-95 cursor-pointer transition-all ease-in-out"}>
                                    {(i <= 2) && <span className={`text-white rounded-tr-xl absolute right-0 ${(i == 0) ? "bg-yellow-600" : (i == 1) ? "bg-gray-500" : "bg-orange-900"} px-2 font-thin rounded-bl-xl`}>{`${i + 1}°`}</span>}
                                    {(i == 0) && <FaCrown className="w-6 h-6 absolute right-0 -top-5 rotate-12 text-yellow-500" />}
                                    <div className="overflow-hidden relative bg-senary-color w-20 rounded-tl-xl rounded-bl-xl">
                                        <Image priority={true} alt={Artist.name} src={Artist.avatar} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover object-center" />
                                    </div>
                                    <div className="w-36 h-16 flex-1 flex flex-col items-center justify-center text-senary-color px-5 ">
                                        <span className="font-extrabold line-clamp-2">{Song.title}</span>
                                        <span className="text-sm line-clamp-1">{Artist.name}</span>
                                    </div>
                                </Container>
                            </Link>
                        )
                    })
                )
            }
        </>
    )
}