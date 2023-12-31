"use client"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useRef, useEffect, useState } from "react";
import Card from "../Card";
import Link from "next/link";
import { handleSlide } from "@/functions/components/slide";
import { encodeURL } from "@/functions/serverUtils/utils";
import Loading from "@/app/[lang]/loading";


export default function Slide({ Artists, lang }) {
    const arrArtistRef = useRef([...Artists]);
    const sliderRef = useRef();
    const leftBtn = useRef();
    const rightBtn = useRef();

    const [arrArtist, setArrArtist] = useState([]);
    const [hide, setHide] = useState(false);

    const checkWidth = () => {
        const wScreen = window.innerWidth;

        if (wScreen <= 640) {
            setArrArtist(arrArtistRef.current.slice(0, 1));
            setHide(true);
        } else {
            setArrArtist(arrArtistRef.current.slice(0, 4));
            setHide(false);
        }
    };
    useEffect(() => {
        checkWidth()
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);
    useEffect(() => handleSlide(sliderRef.current, leftBtn.current, rightBtn.current), []);

    return (
        <>
            {!hide && (
                <div ref={leftBtn} className="relative flex items-center justify-center bg-tertiary-color p-5 opacity-50 hover:opacity-100 cursor-pointer transition-all ease-in-out" >
                    <FaCircleChevronLeft className="w-8 h-8 colorDefault" />
                </div>
            )}
            {!arrArtist.length
                ?
                (
                    <div className="block w-full py-5 scale-50">
                        <Loading />
                    </div>
                )
                :
                (
                    <div ref={sliderRef} className="flex gap-2 overflow-x-auto overflow-hidden w-full relative p-5 noScroll !scroll-smooth max-sm:justify-center " >
                        {arrArtist.map(({ id, name, avatar }) => (
                            <Link key={id} href={`/${lang}/artists/${encodeURL(id)}`}>
                                <Card container_className={"p-5 scale-95 hover:scale-100 cursor-pointer transition-all ease-in-out flex flex-col justify-center items-center max-w-[200px]"} title_className={"block text-center text-senary-color font-extrabold line-clamp-1 break-normal"} avatar={avatar} name={name} />
                            </Link>
                        ))}
                    </div>
                )
            }
            {!hide && (
                <div ref={rightBtn} className="relative right-0  flex items-center bg-tertiary-color p-5 opacity-50 hover:opacity-100 cursor-pointer transition-all ease-in-out">
                    <FaCircleChevronRight className="w-8 h-8 colorDefault " />
                </div>
            )}

        </>
    )
}