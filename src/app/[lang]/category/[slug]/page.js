import { decodeURL, encodeURL } from "@/functions/serverUtils/utils";
import { getCategories } from "../functions";
import Container from "@/components/Container";
import Link from "next/link";
import Card from "@/components/Card";

export default async function Category({ params }) {
    const artistsByCategories = await getCategories();
    const artistLength = artistsByCategories.filter(({ Category }) => Category.title === decodeURL(params.slug)).map(({ Category: { Artist } }) => Artist.length)
    return (
        <>
            <Container className="flex items-center p-5 ">
                <div className="font-semibold text-lg ml-5 text-senary-color">{`${decodeURL(params.slug)} ( ${artistLength} )`}</div>
            </Container>
            <section className="flex flex-wrap my-5 gap-3 max-md:justify-center">
                {artistsByCategories?.filter(({ Category }) => Category.title === decodeURL(params.slug))
                    .map(({ Category: { Artist } }) => (
                        Artist.map(({ id, name, avatar }) => (
                            <Link key={id} href={`/${params.lang}/artists/${encodeURL(id)}`}>
                                <Card container_className={"p-5 scale-95 hover:scale-100 cursor-pointer transition-all ease-in-out flex flex-col justify-center items-center max-w-[200px]"} title_className={"block text-center text-senary-color font-extrabold line-clamp-1 break-normal"} name={name} avatar={avatar} />
                            </Link>
                        ))
                    ))
                }
            </section>
        </>
    )
}

export const revalidate = 0;