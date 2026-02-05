"use client";
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function AegeanCuisine() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=1920" 
          alt="Aegean Cuisine" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-wide shadow-lg text-center px-4">
            {language === 'tr' ? "Ege Mutfağı" : "Aegean Cuisine"}
          </h1>
        </div>
      </div>

      <section className="py-16 px-6 max-w-[1400px] mx-auto mt-8">
        <div className="text-center mb-12">
          <p className="text-green-800 text-lg max-w-2xl mx-auto italic">
            {language === 'tr' 
              ? "Zeytinyağının, otların ve tazeliğin başkenti. Sağlıklı ve hafif lezzetleri keşfedin."
              : "Capital of olive oil, herbs, and freshness. Discover healthy and light flavors."}
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. ÇORBALAR (SOUP) */}
          <Link 
            href="/aegean-cuisine/soup"  
            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="/ege-corba.jpg" 
              alt="Soups"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                {language === 'tr' ? "Ege Çorbaları" : "Aegean Soups"}
              </h3>
              <span className="text-green-300 text-sm font-bold tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {language === 'tr' ? "Tariflere Git →" : "View Recipes →"}
              </span>
            </div>
          </Link>

          {/* 2. BAŞLANGIÇLAR (STARTER)  */}
          <Link 
            href="/aegean-cuisine/starter" 
            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all lg:mt-12"
          >
            <img 
              src="/ege-zeytinyagli.jpg" 
              alt="Starters"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                {language === 'tr' ? "Başlangıçlar" : "Starters"}
              </h3>
              <span className="text-green-300 text-sm font-bold tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {language === 'tr' ? "Tariflere Git →" : "View Recipes →"}
              </span>
            </div>
          </Link>
          
          {/* 3. ANA YEMEKLER (MAIN) */}
          <Link 
            href="/aegean-cuisine/main"
            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="/ege-anayemek.jpg" 
              alt="Main Courses"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                {language === 'tr' ? "Ana Yemekler" : "Main Courses"}
              </h3>
              <span className="text-green-300 text-sm font-bold tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {language === 'tr' ? "Tariflere Git →" : "View Recipes →"}
              </span>
            </div>
          </Link>
          
          {/* 4. TATLILAR (DESSERT) */}
          <Link 
            href="/aegean-cuisine/dessert" 
            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all lg:mt-12"
          >
            <img
              src="/ege-tatli.jpg" 
              alt="Desserts"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                {language === 'tr' ? "Tatlılar" : "Desserts"}
              </h3>
              <span className="text-green-300 text-sm font-bold tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {language === 'tr' ? "Tariflere Git →" : "View Recipes →"}
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}