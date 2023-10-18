import { MdFavorite } from "react-icons/md"
import Container from "@/components/Container";
import { getAllSongs } from "../functions";
import FavList from "@/components/Favorites/favList";
import get_dictionary from "../../../../dictionaries/get_dictionary";

export default async function Favorites({ params: { lang } }) {
    const t = await get_dictionary(lang);
    const songs = await getAllSongs();
    return (
        <div>
            <Container className="flex items-center  p-5 ">
                <MdFavorite className="w-8 h-8 colorDefault" />
                <h2 className="font-extrabold text-lg ml-5 text-senary-color">{t.Favoritespage.header}</h2>
            </Container>
            <section className="flex flex-col gap-5 my-5 ">
                <FavList lang={lang} songs={songs} />
            </section>
        </div>
    )
}

export const revalidate = 0;