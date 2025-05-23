"use client"
import Section from "@/components/Section"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react";
export default function FavoritesPage({ params: { locale } }) {
    const [favoritesSongs, setFavoritesSongs] = useState();
    const t = useTranslations("Favoritespage");
    const tLoading = useTranslations("");
    useEffect(() => {
        if (typeof localStorage === "undefined") return;
        const favoritesSongs = localStorage.getItem("favorites") !== null ? JSON.parse(localStorage.getItem("favorites")) : [];
        setFavoritesSongs(favoritesSongs);
    }, [])

    if (!favoritesSongs) {
        return <div className="text-center mt-10 text-xl">
            {tLoading("loading_message")}
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div >
    }

    return (
        <Section title={`${t("header")} (${favoritesSongs?.length ?? 0})`} seeAll={false} className={`mt-10 max-md:grid-cols-1 ${(favoritesSongs === null || favoritesSongs?.length === 0) && "grid-cols-1"} gap-2`} >
            {(favoritesSongs?.length === 0)
                ? (<span className="mx-auto">{t("empty_message")}</span>)
                : (
                    favoritesSongs?.map((favs, i) => (
                        <li key={favs.song.id} >
                            <Link href={`/${locale}/artists/${favs.artist.id}~${favs.song.id}`} className='w-full'>
                                <div className='bg-[#242424] h-full relative flex flex-col  justify-center rounded-md w-full overflow-hidden  [&]:hover:bg-[rgb(73,73,73)] transition-colors [&>div:nth-child(2)]:hover:text-[#FFF] cursor-pointer '>
                                    <span className={`bg-unselected self-start  text-[#242424] font-extrabold px-3 text-sm rounded-br-md`}>{i + 1}</span>
                                    <div className='flex-1  flex flex-col py-2 px-4  font-extrabold'>
                                        {favs.song.name}
                                        <i className="text-xs text-[rgb(135,135,135)]">{t("by")} {favs.artist.name}</i>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))
                )}
        </Section>
    )
}