"use client"; 

import { useLanguage } from "../context/LanguageContext";
import LanguageModal from "../components/LanguageModal";
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react'; 
import axios from 'axios'; 

export default function HomeContent() {
  const { t, language } = useLanguage(); 
  const router = useRouter(); 
  const [recipes, setRecipes] = useState([]); 

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler`);
        setRecipes(response.data);
      } catch (error) {
        const errorMessage = language === 'tr' 
          ? "Mutfakla bağlantı kurulamadı! ❌" 
          : "Could not connect to the kitchen! ❌";
        console.error(errorMessage, error);
      }
    };
    fetchRecipes();
  }, [language]); 

  const handleRandomRecipe = () => {
    if (recipes.length === 0) return; 
    
    
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    
    
    const target = randomRecipe.slug || randomRecipe.id;
    if (target) {
      window.location.href = `/recipe/${target}`;
    }
  };

  return (
    <main className="min-h-screen flex flex-col text-[#2D3436] bg-[#FDFBF7]">
      <LanguageModal />

      <section className="flex-1 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-8 gap-12">
        
        <div className="flex-1 space-y-8 text-center md:text-left">
          <span className="text-amber-500 font-bold tracking-[0.2em] text-sm uppercase block">
              — VegRoot
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1]">
            {t.heroTitle.split(' ').map((word, i) => i === 1 ? <span key={i} className="text-green-600 italic block">{word} </span> : word + ' ')}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
            {t.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
            
            {/* DOLABIMDA NE VAR BUTONU */}
            <Link 
              href="/search"
              className="group relative bg-green-600 text-white px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="text-2xl transition-transform group-hover:rotate-12">🧺</span>
              <span className="font-bold">
                {language === 'tr' ? "Dolabımda Ne Var?" : "Pantry Pick"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
            </Link>

            {/* RASTGELE TARİF BUTONU */}
            <button 
              onClick={handleRandomRecipe}
              className="border-2 border-slate-800 text-slate-800 px-8 py-4 rounded-full text-lg hover:bg-slate-800 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {t.btnRandom} 🎲
            </button>

          </div>
        </div>

        {/* ANA GÖRSEL  */}
        <div className="flex-1 w-full flex justify-center relative">
          <div className="relative w-[350px] h-[450px] md:w-[450px] md:h-[600px] rounded-t-full overflow-hidden shadow-2xl border-4 border-white/50">
             <img
               src="/hero-image.jpg"
               alt="VegRoot Vegan Recipes"
               loading="lazy" 
               className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

      </section>
    </main>
  );
}