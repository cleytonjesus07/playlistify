import Container from "@/components/Container";
import { FaEarListen } from "react-icons/fa6";
import Category from "@/components/Home/categories";
import MostListening from "@/components/Home/mostListening";
import { mostListening } from "./functions";
import OutDoor from "@/components/OutDoor";
import { getAllArtists } from "./artists/functions";
import get_dictionary from "../../../dictionaries/get_dictionary";




export default async function Home({ params: { lang } }) {
    const t = await get_dictionary(lang);
    let artists = await getAllArtists();
    artists.forEach((artist) => delete artist["Songs"]);
    return (
        <div className="flex flex-col gap-5">
            <OutDoor lang={lang} artists={artists} />
            <Container className="flex items-center  p-5 ">
                <FaEarListen className="w-8 h-8 colorDefault" />
                <h2 className="font-extrabold text-lg ml-5 text-senary-color">{t.Homepage.most_listening.header}</h2>
            </Container>
            <Container className="flex flex-col md:flex-row justify-center gap-2 overflow-hidden p-5 ">
                <MostListening lang={lang} mostListening={mostListening} />
            </Container>
            <Category lang={lang} />
        </div>
    )
}

export const revalidate = 0;

