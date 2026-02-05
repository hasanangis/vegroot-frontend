"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function WorldCuisine() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      
      {/* --- HERO: GLOBAL VİZYON --- */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <img 
          src="/dunya-hero-yeni.jpg" 
          alt="World Cuisine" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-wide shadow-lg text-center px-4">
            {language === 'tr' ? "Dünya Mutfağı" : "World Cuisine"}
          </h1>
        </div>
      </div>

      <section className="py-16 px-6 max-w-[1400px] mx-auto mt-8">
        <div className="text-center mb-12">
          <p className="text-amber-800 text-lg max-w-2xl mx-auto italic">
            {language === 'tr' 
              ? "Sınır tanımayan lezzetler, farklı kültürlerin bitkisel yorumları."
              : "Flavors without borders, plant-based interpretations of different cultures."}
          </p>
        </div>

        {/* --- KATEGORİ KARTLARI: AKILLI SIRALAMA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. GLOBAL ÇORBALAR (SOUP) */}
          <Link 
            href="/world-cuisine/soup"
            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="/dunya-corba.jpg"
              alt="Soups"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                {language === 'tr' ? "Global Çorbalar" : "Global Soups"}
              </h3>
              <span className="text-amber-200 text-sm font-bold tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {language === 'tr' ? "Tariflere Git →" : "View Recipes →"}
              </span>
            </div>
          </Link>

          {/* 2. BAŞLANGIÇLAR (STARTER) - Çorbadan sonra gelir */}
          <Link 
            href="/world-cuisine/starter"
            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all lg:mt-12 block"
          >
            <img 
              src="/dunya-baslangic.jpg" 
              alt="Starters"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                {language === 'tr' ? "Başlangıçlar" : "Starters"}
              </h3>
              <span className="text-amber-200 text-sm font-bold tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {language === 'tr' ? "Tariflere Git →" : "View Recipes →"}
              </span>
            </div>
          </Link>

          {/* 3. DÜNYA LEZZETLERİ (MAIN) */}
          <Link 
            href="/world-cuisine/main"
            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="/dunya-anayemek.jpg" 
              alt="Main Courses"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                {language === 'tr' ? "Dünya Lezzetleri" : "World Flavors"}
              </h3>
              <span className="text-amber-200 text-sm font-bold tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {language === 'tr' ? "Tariflere Git →" : "View Recipes →"}
              </span>
            </div>
          </Link>

          {/* 4. TATLILAR (DESSERT) */}
          <Link 
            href="/world-cuisine/dessert"
            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all lg:mt-12"
          >
            <img
              src="/dunya-tatli.jpg"
              alt="Desserts"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                {language === 'tr' ? "Global Tatlılar" : "Global Desserts"}
              </h3>
              <span className="text-amber-200 text-sm font-bold tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {language === 'tr' ? "Tariflere Git →" : "View Recipes →"}
              </span>
            </div>
          </Link>

        </div>
      </section>
    </div>
  );
}