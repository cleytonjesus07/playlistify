import Section from "@/components/Section";
import { getAllCategories } from "@/supabase";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FaCompactDisc } from "react-icons/fa";

export const metadata = {
    title: "Categorias"
}

export default async function CategoriesPage({ params: { locale } }) {
    const t = await getTranslations("Categoriespage");
    const allCategories = await getAllCategories();
    return (
        <div>
            <Section title={t("header")} three_columns={true} gradient={true} className={"gap-3 max-md:grid-cols-1"} href={`#`}>
                {allCategories.map(({ id_category, title_category }) => (
                    <li key={id_category} >
                        <Link href={`/${locale}/categories/${id_category}`} className='w-full'>
                            <div className='bg-[#242424] relative flex rounded-md w-full overflow-hidden items-center [&]:hover:bg-[rgb(73,73,73)] transition-colors [&>div:nth-child(2)]:hover:text-[#FFF] cursor-pointer h-20'>
                                <div className='flex-1 ml-4 font-extrabold'>
                                    {title_category}
                                </div>
                                <FaCompactDisc className="absolute right-0 w-auto h-full opacity-10" />
                            </div>
                        </Link>
                    </li>
                ))}
            </Section>
        </div>
    )
}