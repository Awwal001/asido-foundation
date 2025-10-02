import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Asido Foundation - Mental Health Advocacy',
  description: 'Making mental health support accessible through advocacy and action',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-jakarta antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}