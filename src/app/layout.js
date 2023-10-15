import '@/app/globals.css'
import AudioPlayer from '@/components/AudioPlayer'
import ContainerMenu from '@/components/ContainerMenu'
import Background from "@/components/Background"
export const metadata = {
  title: 'PlayListify',
  description: 'Seu canto musical!',
}

export default function RootLayout({ children, params }) {

  return (
    <html className="bg-tertiary-color" lang={"pt-br"}>
      <body className={` flex h-screen gap-10`}>
        <ContainerMenu />
        <div className="flex-1 overflow-x-hidden px-10 pt-5 pb-24">
          {children}
        </div>
        <AudioPlayer />
        <Background />
      </body>
    </html>
  )
}
