// app/layout.tsx
import './globals.css'
import InactivityTimer from '../components/InactivityTimer'
import { Providers } from './providers'
import { Noto_Sans, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'Sayville High School',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", notoSans.variable, playfairDisplayHeading.variable)}>
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
