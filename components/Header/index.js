"use client"

import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";


export default function Header() {

    const lang = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switcherLanguage = (language) => {
        const newPathname = pathname.replace(lang, language);
        router.replace(newPathname);
    }
    return (
        <header className="h-16 flex justify-end items-center bg-[#111] px-2">
            <div className="bg-gradient-to-tr from-[#1e1e1e] to-[#252525] w-32 rounded-md justify-evenly inline-flex items-center [&>button>span]:w-14 max-md:py-2">
                <button title="EUA's flag" className={`opacity-30 ${pathname.includes("en-us") && '!opacity-100'}`} onClick={() => switcherLanguage("en-us")}>
                    <span className="fi fi-us w-7 h-7"></span>
                </button>
                <button title="Brazil's flag" className={`opacity-30 ${pathname.includes("pt-br") && '!opacity-100'}`} onClick={() => switcherLanguage("pt-br")}><span className="fi fi-br w-7 h-7"></span></button>
            </div>
        </header>
    )
}