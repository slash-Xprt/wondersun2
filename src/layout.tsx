import './globals.css'
import './fonts.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wondersun Festival',
  description: 'Experience the ultimate music celebration with world-class artists and unforgettable performances at Wondersun Festival.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}