"use client"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useRef, useEffect } from "react";
import Card from "../Card";
import Link from "next/link";
import { handleSlide } from "@/functions/components/slide";
import { encodeURL } from "@/functions/serverUtils/utils";
import { shuffleArray } from "@/functions/clientUtils/util";
export default function Slide({ Artists }) {
    const shuffledArray = shuffleArray(Artists)
    const sliderRef = useRef();
    const leftBtn = useRef();
    const rightBtn = useRef();
    useEffect(() => handleSlide(sliderRef.current, leftBtn.current, rightBtn.current), []);

    return (
        <>
            <div ref={leftBtn} className="relative flex items-center justify-center bg-tertiary-color p-5 opacity-50 hover:opacity-100 cursor-pointer transition-all ease-in-out" >
                <FaCircleChevronLeft className="w-8 h-8 colorDefault" />
            </div>
            <div ref={sliderRef} className="flex gap-2 overflow-x-auto overflow-hidden w-full relative p-5 noScroll !scroll-smooth " >
                {shuffledArray.slice(0, 4).map(({ id, name, avatar }) => (
                    <Link key={id} href={`/artists/${encodeURL(id)}`}>
                        <Card container_className={"p-5 scale-95 hover:scale-100 cursor-pointer transition-all ease-in-out flex flex-col justify-center items-center max-w-[200px]"} title_className={"block text-center text-senary-color font-extrabold line-clamp-1 break-normal"} avatar={avatar} name={name} />
                    </Link>
                ))}
            </div>
            <div ref={rightBtn} className="relative right-0  flex items-center bg-tertiary-color p-5 opacity-50 hover:opacity-100 cursor-pointer transition-all ease-in-out">
                <FaCircleChevronRight className="w-8 h-8 colorDefault " />
            </div>
        </>
    )
}