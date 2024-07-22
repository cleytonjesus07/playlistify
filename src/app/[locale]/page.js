import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Header from '@/components/Header';
import Section from '@/components/Section';
import Card from '@/components/Section/Card';
import { getRandomCategories, getRandomComposers, getSixSongsOfTheWeek } from '@/supabase';
import Link from 'next/link';

export const metadata = {
  title: 'Playlistify',
}

export default async function Index({ params: { locale } }) {
  const t = await getTranslations("Homepage")
  const sixSongsOfTheWeek = await getSixSongsOfTheWeek();
  const randomComposers = await getRandomComposers();
  const randomCategories = await getRandomCategories();
  return (
    <div className='bg-[#121212]'>
      <Header />

      {/* Músicas da semana */}
      <Section title={t("songs_of_the_week")} three_columns={true} gradient={true} className={"gap-3 max-md:grid-cols-2 max-sm:grid-cols-1"}>
        {sixSongsOfTheWeek.map(({ id_song, id_composer, title_song, Composers: { name_composer, image_composer } }) => (
          <li key={id_song} >
            <Link href={`/${locale}/artists/${id_composer}~${id_song}`} className='w-full'>
              <div className='bg-[#242424] flex rounded-md w-full overflow-hidden items-center [&]:hover:bg-[rgb(73,73,73)] transition-colors [&>div:nth-child(2)]:hover:text-[#FFF] cursor-pointer'>
                <div className='bg-unselected w-24 h-20 relative '>
                  <Image
                    alt={`imagem de capa ${name_composer}`}
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
      {/* Artistas */}
      <Section className={"max-md:grid-cols-1"} title={t("artist", { cardinals: 1 })} seeAll={true} href={`/${locale}/artists`}>
        {randomComposers.map(({ id_composer, name_composer, image_composer }) => (
          <li key={id_composer} ><Link className='max-md:w-full' href={`/${locale}/artists/${id_composer}`}><Card avatar={image_composer} title={name_composer} /></Link></li>
        ))}
      </Section>
      {/* Categorias */}
      {Object.keys(randomCategories).map((category) => (
        <Section className={"max-md:grid-cols-1"} key={randomCategories[category][0].id_category} title={category} seeAll={true} locale={locale} href={`/${locale}/categories/${randomCategories[category][0].id_category}`}>
          {randomCategories[category].map(({ id_song, image_composer, id_composer, title_song, name_composer }) => (
            <li key={id_song}>
              <Link href={`/${locale}/artists/${id_composer}~${id_song}`}>
                <Card square_rounded={true} avatar={image_composer} title={title_song} name_composer={name_composer} />
              </Link>
            </li>
          ))}
        </Section>
      ))
      }
    </div >
  );
}
