import '../assets/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import "../assets/styles/normalize.css"
import "../assets/styles/main.scss"
import "../assets/styles/slider.scss"
import "../assets/styles/color-picker.scss"

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout ({ children, }: { children: React.ReactNode }) {



  return (
    <html lang="en">
    <body className={inter.className}>{children}</body>
    </html>
  )
}
