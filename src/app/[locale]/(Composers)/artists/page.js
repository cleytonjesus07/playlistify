import Section from "@/components/Section";
import Card from "@/components/Section/Card";
import { getAllComposers } from "@/supabase";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
export const metadata = {
    title: 'Artistas',
}
export default async function ArtistsPage({ params: { locale } }) {
    const t = await getTranslations("Artistspage")
    const allComposers = await getAllComposers();
    return (
        <Section title={t("header")} seeAll={false} className={"mt-10 max-md:grid-cols-1 max-md:gap-2"} >
            {allComposers.map(({ id_composer, name_composer, image_composer }) => (
                <li key={id_composer}><Link className="w-full" href={`/${locale}/artists/${id_composer}`}><Card avatar={image_composer} title={name_composer} cardinals={0} /></Link></li>
            ))}
        </Section>
    )
}