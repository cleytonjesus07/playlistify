"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
import Container from "../Container";
import Logo from "../Logo";
import { BiSolidPlaylist } from "react-icons/bi"
import { MdFavorite, MdCategory } from "react-icons/md"
import { HiMiniMusicalNote } from "react-icons/hi2"
export default function AsideMenu() {
    const pathname = usePathname();
    return (
        <Container className="fixed  p-5 ">
            <Logo />
            <nav className="flex border-t-2 border-senary-color py-5 flex-col gap-2 ">
                <Link className={`text-senary-color ${pathname == "/" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/"><HiMiniMusicalNote className="w-6 h-6" />Início</Link>
                <Link className={`text-senary-color ${pathname == "/artists" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/artists"><BiSolidPlaylist className="w-6 h-6" />Lista de Artistas</Link>
                <Link className={`text-senary-color ${pathname == "/category" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/category"><MdCategory className="w-6 h-6" />Todas as categorias</Link>
                <Link className={`text-senary-color ${pathname == "/favorites" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/favorites"><MdFavorite className="w-6 h-6" />Suas favoritas</Link>
            </nav>
        </Container>
    )
}