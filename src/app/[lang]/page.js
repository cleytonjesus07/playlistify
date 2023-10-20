import Container from "@/components/Container";
import { FaEarListen } from "react-icons/fa6";
import Category from "@/components/Home/categories";
import MostListening from "@/components/Home/mostListening";
import { getRecentsSongs, mostListening } from "./functions";
import OutDoor from "@/components/OutDoor";
import { getAllArtists } from "./artists/functions";
import get_dictionary from "../../../dictionaries/get_dictionary";





export default async function Home({ params: { lang } }) {
    const t = await get_dictionary(lang);
    let artists = await getAllArtists();
    artists.forEach((artist) => delete artist["Songs"]);
    const recentsSongs = await getRecentsSongs();

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col overflow-x-hidden relative">
                <span className="text-sm text-white bg-senary-color px-4 py-1 rounded-md select-none max-md:text-right">{t.Homepage.recents_songs.title}</span>
                <div className="flex py-2  movingToLeft relative gap-5">
                    {recentsSongs.map(({ Song: { id, title }, Artist: { name } }) => {
                        return (
                            <div className="bg-primary-color flex flex-col w-[200px]  rounded-md text-senary-color font-extralight select-none border-4 border-solid border-senary-color whitespace-nowrap" key={id}>
                                <span className="max-sm:block flex-1 items-center flex text-sm font-extrabold p-1  "> {title}</span>
                                <span className=" bg-senary-color text-xs p-1 text-white ">{t.Homepage.recents_songs.label} {name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
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

