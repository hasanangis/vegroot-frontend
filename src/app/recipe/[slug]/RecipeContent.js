"use client";
import { useParams } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import RecipeSocial from '@/components/RecipeSocial';

export default function RecipeContent() {
  const params = useParams(); 
  const { language } = useLanguage();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler/slug/${params.slug}`);
        setRecipe(response.data);
      } catch (error) { 
        console.error("Mutfak servisinde bir aksama oldu!", error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchRecipeDetail();
    }
  }, [params.slug]); 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <p className="p-20 text-center italic text-green-900 text-xl animate-pulse">
          {language === 'tr' ? "Lezzet mühürleniyor... 👨‍🍳" : "Sealing the flavor... 👨‍🍳"}
        </p>
      </div>
    );
  }

  if (!recipe || (typeof recipe === 'object' && Object.keys(recipe).length === 0)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-red-500 mb-6">
          {language === 'tr' ? "Tarif bulunamadı!" : "Recipe not found!"}
        </h2>
        <Link href="/" className="bg-green-800 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition-colors">
          {language === 'tr' ? "Ana Sayfaya Dön" : "Back to Home"}
        </Link>
      </div>
    );
  }

  const getSafeIngredients = (data) => {
    if (Array.isArray(data)) return data; 
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (error) { 
        return data.split(',').map(m => m.trim()).filter(m => m !== "");
      }
    }
    return [];
  };

  const getRecipeImageUrl = (url) => {
    if (!url) return "/hero-image.jpg"; 
    if (url.startsWith('http')) return url; 
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`; 
  };

  const currentIngredients = getSafeIngredients(language === 'tr' ? recipe.malzemeler_tr : recipe.malzemeler_en);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <div className="h-[60vh] relative overflow-hidden">
        {/* ANA GÖRSEL */}
        <img 
          src={getRecipeImageUrl(recipe.image_url)} 
          alt={language === 'tr' ? recipe.title_tr : recipe.title_en} 
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-20">
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white text-center px-4 drop-shadow-2xl">
            {language === 'tr' ? recipe.title_tr : recipe.title_en}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-green-50">
          <div className="grid md:grid-cols-5 gap-16">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-serif font-bold text-green-900 mb-8 flex items-center gap-3">
                <span className="text-3xl">🌿</span> {language === 'tr' ? "Malzemeler" : "Ingredients"}
              </h3>
              <ul className="space-y-4">
                {currentIngredients.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-gray-700 group cursor-default">
                    <span className="mt-2 w-2 h-2 bg-green-600 rounded-full group-hover:scale-150 transition-transform flex-shrink-0"></span>
                    <span className="text-lg leading-snug group-hover:text-green-900 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-2xl font-serif font-bold text-green-900 mb-8 flex items-center gap-3">
                <span className="text-3xl">👨‍🍳</span> {language === 'tr' ? "Hazırlanışı" : "Instructions"}
              </h3>
              <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line bg-gray-50/80 p-8 rounded-[2.5rem] border border-gray-100 shadow-inner font-serif italic">
                 {language === 'tr' ? recipe.instructions_tr : recipe.instructions_en}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center max-w-5xl mx-auto px-6">
        <RecipeSocial />
      </div>
    </div>
  );
}