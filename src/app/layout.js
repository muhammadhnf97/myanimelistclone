import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Providers from './context/providers'

const nunito = Nunito({ subsets: ['latin']})

export const metadata = {
  title: 'Anime List',
  description: 'Anime list by myself',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-bgcolors`}>
        <Providers>
          <div className='flex flex-col justify-between'>
          <Navbar />
          <main className='mt-28'>
            {children}
          </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
