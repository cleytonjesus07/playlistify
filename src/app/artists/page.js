import Card from "@/components/Card";
import Container from "@/components/Container";
import { encodeURL } from "@/functions/serverUtils/utils";
import Link from "next/link";
import { getAllArtists } from "./functions";
import { BiSolidPlaylist } from "react-icons/bi";

export default async function Artists() {
    const artists = await getAllArtists();
    return (
        <>
            <Container className="flex items-center p-5 ">
                <BiSolidPlaylist className="w-8 h-8 colorDefault" />
                <div className="font-semibold text-lg ml-5 text-senary-color">Todos os artistas {`( ${artists.length} )`}</div>
            </Container>
            <section className="flex flex-wrap my-5 gap-3 max-md:justify-center">
                {artists?.map(({ id, name, avatar }) => (
                    <Link key={id} href={`/artists/${encodeURL(id)}`}>
                        <Card container_className={"p-5 scale-95 hover:scale-100 cursor-pointer transition-all ease-in-out flex flex-col justify-center items-center max-w-[200px]"} title_className={"block text-center text-senary-color font-extrabold line-clamp-1 break-normal"} name={name} avatar={avatar} />
                    </Link>
                ))}
            </section>
        </>
    )
}

export const revalidate = 0;