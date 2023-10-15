"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
import Container from "../Container";
import Logo from "../Logo";
import { BiSolidPlaylist } from "react-icons/bi"
import { MdFavorite, MdCategory } from "react-icons/md"
import { HiMiniMusicalNote } from "react-icons/hi2"
import { IoMdCloseCircle } from "react-icons/io"
import { useEffect } from "react";

export default function AsideMenu({ setShow }) {
    const pathname = usePathname();

    return (
        <Container className="fixed p-5 max-md:top-0 max-md:bottom-0 max-md:right-0 max-md:left-0 max-md:z-50 max-md:rounded-none ">
            <div className="flex relative justify-center items-center">
                <Logo />
                <button onClick={() => setShow(old => !old)} className="absolute right-2 top-0 md:hidden">
                    <IoMdCloseCircle className="w-10 h-10 colorDefault" />
                </button>
            </div>
            <nav className="flex border-t-2 border-senary-color py-5 flex-col">
                <div className="flex flex-col gap-2 max-md:hidden">
                    <Link className={`text-senary-color ${pathname == "/" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/"><HiMiniMusicalNote className="w-6 h-6" />Início</Link>
                    <Link className={`text-senary-color ${pathname == "/artists" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/artists"><BiSolidPlaylist className="w-6 h-6" />Lista de Artistas</Link>
                    <Link className={`text-senary-color ${pathname == "/category" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/category"><MdCategory className="w-6 h-6" />Todas as categorias</Link>
                    <Link className={`text-senary-color ${pathname == "/favorites" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/favorites"><MdFavorite className="w-6 h-6" />Suas favoritas</Link>
                </div>
                <div className="flex flex-col gap-2 md:hidden ">
                    <a className={`text-senary-color ${pathname == "/" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/"><HiMiniMusicalNote className="w-6 h-6" />Início</a>
                    <a className={`text-senary-color ${pathname == "/artists" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/artists"><BiSolidPlaylist className="w-6 h-6" />Lista de Artistas</a>
                    <a className={`text-senary-color ${pathname == "/category" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/category"><MdCategory className="w-6 h-6" />Todas as categorias</a>
                    <a className={`text-senary-color ${pathname == "/favorites" && "!bg-senary-color !text-primary-color"} hover:bg-senary-color hover:text-primary-color rounded-xl p-2 transition-all ease-in-out flex items-center gap-2`} href="/favorites"><MdFavorite className="w-6 h-6" />Suas favoritas</a>
                </div>
            </nav>
        </Container>
    )
}
