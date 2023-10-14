import Background from '@/components/Background'
import '@/app/globals.css'
import AsideMenu from '@/components/AsideMenu'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata = {
  title: 'PlayListify',
  description: 'Seu canto musical!',
}

export default function RootLayout({ children }) {
  return (
    <html className="bg-tertiary-color" lang="pt-BR">
      <body className={` flex h-screen gap-10`}>

        <div className="max-w-xs w-52 p-5">
          <AsideMenu />
        </div>
        <div className="flex-1 overflow-x-hidden px-10 pt-5 pb-24">
          {children}
        </div>
        <AudioPlayer />
        <Background />
      </body>
    </html>
  )
}
