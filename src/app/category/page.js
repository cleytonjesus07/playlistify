import Container from "@/components/Container";
import Link from "next/link";
import { getCategories } from "./functions";
import { encodeURL } from "@/functions/serverUtils/utils";
import { MdCategory } from "react-icons/md";

export default async function Category() {
    const categories = await getCategories();
    return (
        <>
            <Container className="flex items-center p-5 ">
                <MdCategory className="w-8 h-8 colorDefault" />
                <div className="font-semibold text-lg ml-5 text-senary-color">Todas as categorias {`( ${categories.length} )`}</div>
            </Container>
            <section className="flex flex-col flex-wrap my-5 gap-3">
                {categories?.map(({ Category: { id, title } }, i) => (
                    <Link key={id} href={`/category/${encodeURL(title).replace(/=/g, '')}`}>
                        <Container className={`flex flex-1 items-center cursor-pointer gap-5 rounded-xl overflow-hidden scale-95 hover:bg-senary-color hover:scale-100 group`}>
                            < div className="bg-senary-color p-5 text-white">{i + 1}</div>
                            <div className={`flex-1 text-senary-color group-hover:text-white line-clamp-1`}>{title}</div>
                        </Container>
                    </Link>
                ))}
            </section>
        </>
    )
}

export const revalidate = 0;