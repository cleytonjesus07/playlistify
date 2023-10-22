import AudioPlayer from '@/components/AudioPlayer'
import ContainerMenu from '@/components/ContainerMenu'
import Background from "@/components/Background"

export const metadata = {
  title: 'PlayListify',
  description: 'Seu canto musical!',
}

export default function RootLayout({ children, params: { lang } }) {

  return (
    <html className="bg-tertiary-color" lang={lang}>
      <body className={` flex h-screen gap-10 max-w-[1920px]`}>
        <ContainerMenu lang={lang} />
        <div className="flex-1 overflow-x-hidden px-10 pt-5 pb-32">
          {children}
        </div>
        <AudioPlayer lang={lang} />
        <Background />
      </body>
    </html>
  )
}
