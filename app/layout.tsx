import './globals.css'
import { Providers } from './providers';
import InactivityTimer from '../components/InactivityTimer';
import background from '../public/images/background.png'
import Footer from '@/components/footer';

export const metadata = {
  title: 'Sayville High School',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className="w-screen h-screen min-h-0 overflow-hidden bg-black">
        <Providers>
          <InactivityTimer timeout={600000} homeTimeout={300000} />
          {/* directly render children */}
          <div 
            className='flex flex-col w-screen h-screen'
            style={{ backgroundImage: `url(${background.src})`, backgroundSize: 'cover' }}
          >
            <div className='flex-1 min-h-0'>
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
