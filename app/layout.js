import './globals.scss'
import { Inter } from 'next/font/google'

import Header from '../components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LINE - KTAM',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <div id='wrapper'>
          <header className='w-full'>
            <Header />
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
