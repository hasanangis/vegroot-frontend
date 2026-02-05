"use client";

import { useLanguage } from '../../../context/LanguageContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Desserts() {
  const { language } = useLanguage();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler`);
        
        
        const filtered = response.data.filter(r => 
          r.category === 'dessert' || r.category === 'Tatlılar'
        );
        
        setRecipes(filtered);
      } catch (error) {
        console.error("Tarifler yüklenirken mutfakta yangın çıktı!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/hero-image.jpg";
    if (imageUrl.startsWith('http')) return imageUrl; 
    return `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`; 
  };

  if (loading) return <div className="text-center py-20 italic">Lezzetler yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
           <Link href="/aegean-cuisine" className="mb-4 text-green-600 hover:text-green-800 font-bold text-sm uppercase tracking-wider transition-colors">
            ← {language === 'tr' ? 'Ege Mutfağına Dön' : 'Back to Aegean Cuisine'}
          </Link>
          <span className="text-green-600 font-bold tracking-wider uppercase text-sm">
            {language === 'tr' ? 'Tatlı Sonlar' : 'Sweet Endings'}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-green-900 mt-3 mb-6">
            {language === 'tr' ? 'Tatlılar' : 'Desserts'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link href={`/recipe/${recipe.slug}`} key={recipe.slug} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  
                  <img 
                    src={getImageUrl(recipe.image_url)} 
                    alt={language === 'tr' ? recipe.title_tr : recipe.title_en} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-green-800 shadow-sm">🌿 Vegan</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                    {language === 'tr' ? recipe.title_tr : recipe.title_en}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
                    {language === 'tr' ? recipe.description_tr : recipe.description_en}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                     <span>⏱️ {recipe.prep_time}</span>
                     <span>🔥 {recipe.calories} kcal</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}