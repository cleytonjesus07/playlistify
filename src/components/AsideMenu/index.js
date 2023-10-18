"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
import Container from "../Container";
import Logo from "../Logo";
import { BiSolidPlaylist } from "react-icons/bi"
import { MdFavorite, MdCategory } from "react-icons/md"
import { HiMiniMusicalNote } from "react-icons/hi2"
import { IoMdCloseCircle } from "react-icons/io"
import get_dictionary from "../../../dictionaries/get_dictionary";

export default function AsideMenu({ setShow, lang }) {
    const t = get_dictionary(lang);
    const pathname = usePathname();

    return (
        <Container className="fixed p-5 w-[255px] max-md:top-0 max-md:bottom-0 max-md:right-0 max-md:left-0 max-md:z-50 max-md:rounded-none ">
            <div className="flex relative justify-center items-center">
                <Logo />
                <button onClick={() => setShow(old => !old)} className="absolute right-2 top-0 md:hidden">
                    <IoMdCloseCircle className="w-10 h-10 colorDefault" />
                </button>
            </div>
            <nav className="flex border-t-2 border-senary-color py-5 flex-col">
                <div className="flex flex-col gap-2 max-md:hidden">
                    <Link className={`text-senary-color ${pathname == "/" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href={`/${lang}`}><HiMiniMusicalNote className="w-6 h-6" />{t.Homepage.menu.home}</Link>
                    <Link className={`text-senary-color ${pathname == "/artists" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href={`/${lang}/artists`}><BiSolidPlaylist className="w-6 h-6" />{t.Homepage.menu.artist_list}</Link>
                    <Link className={`text-senary-color ${pathname == "/category" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href={`/${lang}/category`}><MdCategory className="w-6 h-6" />{t.Homepage.menu.all_categories}</Link>
                    <Link className={`text-senary-color ${pathname == "/favorites" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href={`/${lang}/favorites`}><MdFavorite className="w-6 h-6" />{t.Homepage.menu.your_favorites}</Link>
                </div>
                <div className="flex flex-col gap-2 md:hidden ">
                    <a className={`text-senary-color ${pathname == "/" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href={`/${lang}`}><HiMiniMusicalNote className="w-6 h-6" />{t.Homepage.menu.home}</a>
                    <a className={`text-senary-color ${pathname == "/artists" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href={`/${lang}/artists`}><BiSolidPlaylist className="w-6 h-6" />{t.Homepage.menu.artist_list}</a>
                    <a className={`text-senary-color ${pathname == "/category" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href={`/${lang}/category`}><MdCategory className="w-6 h-6" />{t.Homepage.menu.all_categories}</a>
                    <a className={`text-senary-color ${pathname == "/favorites" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href={`/${lang}/favorites`}><MdFavorite className="w-6 h-6" />{t.Homepage.menu.your_favorites}</a>
                </div>
            </nav>
            <div className="flex gap-1 flex-col justify-center items-center border-t-2 border-senary-color py-2">
                <span className="text-senary-color text-sm font-semibold">{t.Homepage.language.title}</span>
                <div className="flex w-full gap-2 justify-evenly">
                    <Link href={`${pathname.replace(/\/en-US\/|\/en-US/, '/pt-BR/')}`} className={`px-2 text-sm rounded-md bg-senary-color text-white ${lang === "pt-BR" ? "opacity-100" : "opacity-50"}`}>{t.Homepage.language.pt}</Link>
                    <Link href={`${pathname.replace(/\/pt-BR\/|\/pt-BR/, '/en-US/')}`} className={`px-2 text-sm rounded-md bg-senary-color text-white ${lang === "en-US" ? "opacity-100" : "opacity-50"}`}>{t.Homepage.language.en}</Link>
                </div>
            </div>
        </Container>
    )
}
