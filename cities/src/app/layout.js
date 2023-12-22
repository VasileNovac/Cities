import { Inter } from 'next/font/google' ;
import './globals.css' ;
import Navbar from "@/components/navbar" ;

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cities',
  description: 'Generated by search cities',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="flex flex-col items-center justify-between pb-10">
          <Navbar />
        </div>
      </body>
    </html>
  )
}
