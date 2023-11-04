import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const nunito = Nunito({ subsets: ['latin']})

export const metadata = {
  title: 'Anime List',
  description: 'Anime list by myself',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-bgcolors`}>
        <div className='flex flex-col justify-between'>
        <Navbar />
        {children}
        </div>
      </body>
    </html>
  )
}
