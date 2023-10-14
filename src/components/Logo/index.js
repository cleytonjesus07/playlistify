import { FaPlay } from "react-icons/fa"
export default function Logo() {
    return (
        <div className="flex relative justify-center items-center mb-6">
            <FaPlay className="icon w-8 h-8 absolute  left-[.4px] -top-1 z-10 -rotate-12 scale-110" />
            <div className="bg-quaternary-color  rounded-tr-3xl rounded-br-3xl pr-8 ">
                <div className="overflow-hidden py-1">
                    <span className="bg-tertiary-color  text-white font-extrabold mr-2  py-8 pl-9 pr-2">Play</span>
                    <span className="text-primary-color font-extrabold">Listify</span>
                </div>
            </div>
        </div>
    )
}