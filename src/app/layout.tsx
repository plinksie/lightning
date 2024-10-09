import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Electrical Storms Live - Earth',
  description: 'Real-time visualization of electrical storms and aurora activity on Earth',
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