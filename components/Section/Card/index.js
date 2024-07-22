import Image from "next/image";
import { card } from "./style";
import { FaPlay } from "react-icons/fa"
import { useTranslations } from "next-intl";

export default function Card({ square_rounded, avatar, title, name_composer, cardinals }) {
    const t = useTranslations("Homepage")
    const { artistName, container, containerDesc, containerImage, image } = card()
    return (
        <div className={container({ className: "[&>button.play]:hover:animate-toShow max-md:w-full max-md:h-full max-md:flex-row max-md:items-center gap-2" })}>
            <div className={containerImage({ className: " h-full" })}>
                <div className={image({ square_rounded, className: "max-md:w-[200px] max-md:h-[200px] max-sm:w-[100px] max-sm:h-[100px]" })}>
                    <Image
                        alt={`Imagem de ${name_composer}`}
                        src={avatar}
                        className="object-cover w-full h-full"
                        width="0"
                        height="0"
                        sizes="100vw"
                        priority
                    />
                </div>
            </div>
            <div className={containerDesc()}>
                <span className={artistName()}>{title}</span>
                <span className="text-sm">{name_composer ?? t("artist", { cardinals })}</span>
            </div>
            <button title="icone de play" className="play max-md:hidden opacity-0 flex items-center justify-center absolute w-12 h-12 bg-[#1ED760]  right-5 rounded-full animate-toHide   z-10 ">
                <FaPlay color="#000" size={20} />
            </button>

        </div >
    )
}