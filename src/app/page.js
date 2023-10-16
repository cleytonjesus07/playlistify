import Container from "@/components/Container";
import { FaEarListen } from "react-icons/fa6";
import Category from "@/components/Home/categories";
import MostListening from "@/components/Home/mostListening";
import { mostListening } from "./functions";
import OutDoor from "@/components/OutDoor";
import { getAllArtists } from "./artists/functions";




export default async function Home() {
    let artists = await getAllArtists();
    artists.forEach((artist) => delete artist["Songs"]);
    return (
        <div className="flex flex-col gap-5">
            <OutDoor artists={artists} />
            <Container className="flex items-center  p-5 ">
                <FaEarListen className="w-8 h-8 colorDefault" />
                <h2 className="font-extrabold text-lg ml-5 text-senary-color">Artista mais escutado</h2>
            </Container>
            <Container className="flex flex-col md:flex-row justify-center gap-2 overflow-hidden p-5 ">
                <MostListening mostListening={mostListening} />
            </Container>
            <Category />
        </div>
    )
}

export const revalidate = 0;

