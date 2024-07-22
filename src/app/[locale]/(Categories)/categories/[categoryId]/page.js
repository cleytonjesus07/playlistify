import Section from "@/components/Section";
import { getCategory, getSongsByCategory } from "@/supabase"
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params: { categoryId } }) {
    const id = categoryId;
    const title = await getCategory(id);
    return { title }
}

export default async function CategoryPage({ params: { categoryId, locale } }) {
    const { allSongsByCategory, categoryName } = await getSongsByCategory(categoryId);
    return (
        <div>
            <Section title={categoryName} three_columns={true} gradient={true} className={"gap-3 max-md:grid-cols-1"} href={`/songsOfTheWeek`}>
                {allSongsByCategory.map(({ id_song, title_song, Composers: { id_composer, image_composer } }) => (
                    <li key={id_song} >
                        <Link href={`/${locale}/artists/${id_composer}~${id_song}`} className='w-full'>
                            <div className='bg-[#242424] flex rounded-md w-full overflow-hidden items-center [&]:hover:bg-[rgb(73,73,73)] transition-colors [&>div:nth-child(2)]:hover:text-[#FFF] cursor-pointer'>
                                <div className='bg-unselected w-24 h-20 relative '>
                                    <Image
                                        alt={`imagem de capa da música ${title_song}`}
                                        src={image_composer}
                                        className="object-cover w-full h-full"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        priority
                                    />
                                </div>
                                <div className='flex-1 ml-4 font-extrabold'>
                                    {title_song}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </Section>
        </div>
    )
}