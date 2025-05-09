import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Header from '@/components/Header';
import Section from '@/components/Section';
import Card from '@/components/Section/Card';
import { getRandomCategories, getRandomComposers, getSixSongsOfTheWeek } from '@/supabase';
import Link from 'next/link';
import SongsOfTheWeek from './SongsOfTheWeek';

export const metadata = {
  title: 'Playlistify',
}

export default async function Index({ params: { locale } }) {
  const t = await getTranslations("Homepage")
  const sixSongsOfTheWeek = await getSixSongsOfTheWeek();
  const randomComposers = await getRandomComposers();
  const randomCategories = await getRandomCategories();
  console.log(randomCategories)
  return (
    <div className='bg-[#121212]'>
      <Header />

      {/* Músicas da semana */}
      <SongsOfTheWeek sixSongsOfTheWeek={sixSongsOfTheWeek} locale={locale} />
      {/* Artistas */}
      <Section className={"max-md:grid-cols-1"} title={t("artist", { cardinals: 1 })} seeAll={true} href={`/${locale}/artists`}>
        {randomComposers.map(({ id_composer, name_composer, image_composer }) => (
          <li key={id_composer} ><Link className='max-md:w-full' href={`/${locale}/artists/${id_composer}`}><Card avatar={image_composer} title={name_composer} /></Link></li>
        ))}
      </Section>
      {/* Categorias */}
      {Object.keys(randomCategories).map((category) => (
        <Section className={"max-md:grid-cols-1"} key={randomCategories[category].category_id} title={category} seeAll={true} locale={locale} href={`/${locale}/categories/${randomCategories[category].category_id}`}>
          {randomCategories[category].songs.map(({ song_id, title, composer }) => (
            <li key={song_id}>
              <Link href={`/${locale}/artists/${composer.id}~${song_id}`}>
                <Card square_rounded={true} avatar={composer.image} title={title} name_composer={composer.name} />
              </Link>
            </li>
          ))}
        </Section>
      ))
      }
    </div >
  );
}
