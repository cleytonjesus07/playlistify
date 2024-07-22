import Footer from "@/components/Footer";
import "../globals.css"
import MenuLateral from '@/components/Menu';
import { font_default } from '@/fonts/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from "@/Jotai/Provider";


export const metadata = {
  title: {
    absolute: "Playlistify",
    template: "%s | Playlistify"
  }
}

export default async function LocaleLayout({ children, params: { locale } }) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`bg-background text-unselected ${font_default.className}`}>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <div className='flex p-2 max-md:p-0 min-h-screen [&>aside]:min-h-full [&>*]:rounded-md'>
              <MenuLateral />
              <main className='flex-1 ml-[258px] max-md:ml-0  bg-darkgray'>
                {children}
              </main>
            </div>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}