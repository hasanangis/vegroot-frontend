import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from '../components/Footer';
import Header from '../components/Header';
import { LanguageProvider } from "../context/LanguageContext";
import { ModalProvider } from "../context/ModalContext"; 

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata = {
  title: 'VegRoot - Vegan & Natural',
  description: 'Traditional Aegean & World Cuisine',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-[#FDFBF7] antialiased`}>
        
        <LanguageProvider>
          
          <ModalProvider>
            
            
            <Header />
            
            <main className="min-h-screen">
              {children}
            </main>

            <Footer />
            
          </ModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}