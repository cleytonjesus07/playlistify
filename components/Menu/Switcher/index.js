"use client"

import { menu } from "@/Jotai/Atoms/menu"
import { useAtom } from "jotai"
import { GiHamburgerMenu } from "react-icons/gi"
import { ImCross } from "react-icons/im"

export default function Switcher({ handleOpenOrCloseMenuBtn }) {
    const [atomMenu] = useAtom(menu);
    return (
        <button title="Close or open button" className=" z-50 fixed top-2 left-2 md:hidden bg-unselected p-4 !rounded-full" onClick={handleOpenOrCloseMenuBtn}>
            {!atomMenu.show ? <GiHamburgerMenu className="text-[white]" /> : <ImCross className="text-[white]" />}
        </button>
    )
}