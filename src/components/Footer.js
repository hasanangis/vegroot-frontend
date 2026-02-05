"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-green-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌱</span>
              <span className="font-serif font-bold text-2xl tracking-wide">VegRoot</span>
            </div>
            <p className="text-green-200/80 text-sm leading-relaxed">
              {language === 'tr' 
                ? "Toprağın hikayesini tabağınıza taşıyoruz. %100 Bitkisel, %100 Doğal."
                : "Bringing the story of the soil to your plate. 100% Plant-Based, 100% Natural."}
            </p>
          </div>

          
          <div>
            <h4 className="font-bold text-lg mb-6 text-green-100">
              {language === 'tr' ? "Keşfet" : "Explore"}
            </h4>
            <ul className="space-y-3 text-sm text-green-200/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {language === 'tr' ? "Ana Sayfa" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/aegean-cuisine" className="hover:text-white transition-colors">
                  {language === 'tr' ? "Ege Mutfağı" : "Aegean Cuisine"}
                </Link>
              </li>
              <li>
                <Link href="/world-cuisine" className="hover:text-white transition-colors">
                  {language === 'tr' ? "Dünya Mutfağı" : "World Cuisine"}
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  {language === 'tr' ? "Hikayemiz" : "Our Story"}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. KOLON: İletişim */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-green-100">
              {language === 'tr' ? "İletişim" : "Contact"}
            </h4>
            <ul className="space-y-3 text-sm text-green-200/80">
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Türkiye</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>www.vegroot.com</span>
              </li>
            </ul>
          </div>

          
          <div>
            <h4 className="font-bold text-lg mb-6 text-green-100">
              {language === 'tr' ? "Takip Et" : "Follow Us"}
            </h4>
            <div className="flex gap-4">
                  {/* Instagram İkonu */}
                  <a
                    href="https://www.instagram.com/vegrootcom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center hover:bg-green-700 transition-colors"
                  >
                    📸
                  </a>
              {/* Twitter/X İkonu */}
              <a href="#" className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center hover:bg-green-700 transition-colors">
                🐦
              </a>
            </div>
          </div>

        </div>

        
        <div className="border-t border-green-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-green-400">
          <p>&copy; 2026 VegRoot. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-green-200">Privacy Policy</span>
            <span className="cursor-pointer hover:text-green-200">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}