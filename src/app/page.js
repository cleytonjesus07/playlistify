import Container from "@/components/Container";
import { FaEarListen } from "react-icons/fa6";
import Category from "@/components/Home/categories";
import MostListening from "@/components/Home/mostListening";
import { mostListening } from "./functions";

export default async function Home() {
    return (
        <div className="flex flex-col gap-5">
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