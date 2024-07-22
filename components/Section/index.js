import { font_bold } from '@/fonts/google';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { tv } from 'tailwind-variants';

const section = tv({
    slots: {
        container: ' px-2 py-4 ',
        title_container: 'flex items-center',
        list_container: 'list-none grid grid-cols-5 grid-rows-1  [&>*]:flex [&>li>div]:h-80 [&>li>div]:w-full'
    },
    variants: {
        gradient: {
            true: {
                container: 'from-[#1e1e1e] to-transparent bg-gradient-to-b'
            }
        },
        three_columns: {
            true: {
                list_container: 'grid-cols-3'
            }
        }
    }
})

export default function Section({ children, title, gradient, three_columns, className, seeAll, href }) {
    const lang = useLocale();
    const t = useTranslations("Homepage")
    const { container, title_container, list_container } = section();
    return (
        <section className={container({ gradient })}>
            <div className={title_container({ className: "flex items-center justify-between px-4 pb-4" })}>
                <span className={`${font_bold.className} text-2xl  text-[#fff] `}>{title}</span>
                {seeAll && (<Link href={href} locale={lang} className='font-semibold tracking-wide hover:underline hover:cursor-pointer  text-[13px]'>{t("see_all")}</Link>)}
            </div>
            <ul className={list_container({ three_columns, className })}>
                {children}
            </ul>
        </section>
    )
}