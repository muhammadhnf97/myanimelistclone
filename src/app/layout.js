import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Providers from './context/providers'
import Footer from './components/Footer'

const nunito = Nunito({ subsets: ['latin']})

export const metadata = {
  title: 'Anime List',
  description: 'Anime list by myself',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-bgcolors flex flex-col justify-between min-h-screen`}>
        <Providers>
          <Navbar />
          <main className='relative mt-28'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
