// app/layout.tsx
import './globals.css'
import InactivityTimer from '../components/InactivityTimer'
import { Providers } from './providers'

export const metadata = {
  title: 'Sayville High School',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="w-screen h-screen overflow-hidden bg-black">
        <Providers>
          <InactivityTimer timeout={600000} homeTimeout={300000} />
          {/* directly render children */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
