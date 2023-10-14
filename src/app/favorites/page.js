import { MdFavorite } from "react-icons/md"
import FavList from "../../components/Favorites/favList";
import Container from "@/components/Container";
import { getAllSongs } from "../functions";

export default async function Favorites() {
    const songs = await getAllSongs();
    return (
        <div>
            <Container className="flex items-center  p-5 ">
                <MdFavorite className="w-8 h-8 colorDefault" />
                <h2 className="font-extrabold text-lg ml-5 text-senary-color">Suas favoritas</h2>
            </Container>
            <section className="flex flex-col gap-5 my-5 ">
                <FavList songs={songs} />
            </section>
        </div>
    )
}