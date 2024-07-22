"use client"

import { font_bold } from "@/fonts/google";
import Link from "next/link";
import { useLocale, useTranslations } from 'next-intl';
import { GrHomeRounded } from "react-icons/gr"
import { PiUserListFill } from "react-icons/pi"
import { MdOutlineCategory } from "react-icons/md"
import { FaGrinHearts, FaPlay } from "react-icons/fa"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { menu } from "@/Jotai/Atoms/menu";
import Switcher from "./Switcher";



export default function Menu() {
    const [atomMenu, setAtomMenu] = useAtom(menu);
    const lang = useLocale();
    const t = useTranslations("Homepage.menu");
    const pathname = usePathname();
    const menu_itens = [
        {
            href: `/${lang}`,
            title: t("home"),
            icon: <GrHomeRounded className="w-5 h-5" />
        },
        {
            href: `/${lang}/artists`,
            title: t("artist_list"),
            icon: <PiUserListFill className="w-5 h-5" />
        },
        {
            href: `/${lang}/categories`,
            title: t("all_categories"),
            icon: <MdOutlineCategory className="w-5 h-5" />
        },
        {
            href: `/${lang}/favorites`,
            title: t("your_favorites"),
            icon: <FaGrinHearts className="w-5 h-5" />
        }
    ]

    useEffect(() => {
        const handleResize = () => {
            setAtomMenu(old => ({ ...old, isMobile: window.innerWidth <= 768 }))
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const handleClick = (e, href) => {
        if (!atomMenu.isMobile) return;
        e.preventDefault();

        window.location.href = href
        setAtomMenu(old => ({ ...old, show: false }))
    }

    const handleOpenOrCloseMenuBtn = () => {
        setAtomMenu(old => ({ ...old, show: !old.show }))
    }

    return (
        <>
            <Switcher handleOpenOrCloseMenuBtn={handleOpenOrCloseMenuBtn} />
            <aside className={`bg-background flex flex-col mr-2 w-[250px] fixed p-3 max-md:z-50 max-md:w-full ${!atomMenu.show && "max-md:hidden"}`}>
                <div className={`h-14 flex items-center mb-10 gap-2 ${font_bold.className}`}><FaPlay className="size-10 -rotate-6" /> Playlistify</div>
                <nav className="flex-1">
                    <ul className="list-none flex flex-col justify-center gap-5">
                        {menu_itens.map(({ href, title, icon }, i) => (
                            <li key={i} className={`${href === pathname ? "text-[#fff]" : "hover:text-[#fff]"}  transition-colors ease-in-out`}>
                                <Link onClick={(e) => handleClick(e, href)} className="flex gap-2 items-center" href={href}>{icon}{title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>


            </aside>
        </>
    )
}