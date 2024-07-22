"use client"
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SongsOfTheWeek({ sixSongsOfTheWeek, locale }) {
    const [sixSongs, setSixSongs] = useState([]);
    const t = useTranslations("Homepage");
    useEffect(() => {
        const now = new Date();
        if (localStorage.getItem("sixSongs")) {
            const sixSongs = JSON.parse(localStorage.getItem("sixSongs"));
            const expDate = new Date(sixSongs.exp);
            if (!(now > expDate)) {
                setSixSongs(sixSongs.data);
            } else {
                setSixSongs(sixSongsOfTheWeek);
            }
            return;
        }

        const oneWeek = (7 * 24 * 60 * 60 * 1000);
        const expDate = new Date(now.getTime() + oneWeek);

        const sixSongs = {
            data: sixSongsOfTheWeek,
            exp: expDate.toISOString()
        }

        localStorage.setItem('sixSongs', JSON.stringify(sixSongs));
    }, []);
    return (
        <Section title={t("songs_of_the_week")} three_columns={true} gradient={true} className={"gap-3 max-md:grid-cols-2 max-sm:grid-cols-1"}>
            {sixSongs.map(({ id_song, id_composer, title_song, Composers: { name_composer, image_composer } }) => (
                <li key={id_song} >
                    <Link href={`/${locale}/artists/${id_composer}~${id_song}`} className='w-full'>
                        <div className='bg-[#242424] flex rounded-md w-full overflow-hidden items-center [&]:hover:bg-[rgb(73,73,73)] transition-colors [&>div:nth-child(2)]:hover:text-[#FFF] cursor-pointer'>
                            <div className='bg-unselected w-24 h-20 relative '>
                                <Image
                                    alt={`imagem de capa ${name_composer}`}
                                    src={image_composer}
                                    className="object-cover w-full h-full"
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    priority
                                />
                            </div>
                            <div className='flex-1 ml-4 font-extrabold'>
                                {title_song}
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </Section>
    )
}