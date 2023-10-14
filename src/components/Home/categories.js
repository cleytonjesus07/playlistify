import React from "react"
import { GiCompactDisc } from "react-icons/gi";
import Container from "@/components/Container";
import Slide from "@/components/Slide";
import { getArtistsByCategory } from "@/functions/api";

async function getByCategory() {
    const res2 = await getArtistsByCategory();
    const newData = res2.map(({ id_category, title_category, Composers }) => ({
        Category: {
            id: id_category,
            title: title_category
        },
        Artists: Composers.map(({ id_composer, name_composer, image_composer }) => {
            return ({
                id: id_composer,
                avatar: image_composer,
                name: name_composer,
            })
        })
    }));
    return newData;
}

export default async function Category() {
    const categories = await getByCategory();
    return (
        <>
            {categories?.map(({ Category: { id, title }, Artists }) => {
                return (
                    <React.Fragment key={id}>
                        <Container className="flex items-center  p-5 ">
                            <GiCompactDisc className="w-8 h-8 colorDefault" />
                            <h2 className="font-extrabold text-lg ml-5 text-senary-color">{title}</h2>
                        </Container>
                        <Container className="flex gap-5 overflow-hidden">
                            <Slide Artists={Artists} />
                        </Container>
                    </React.Fragment>
                )
            })}
        </>
    )
}