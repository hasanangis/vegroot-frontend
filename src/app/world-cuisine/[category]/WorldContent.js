"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function WorldContent() {
  const { category } = useParams(); 
  const { language } = useLanguage();
  const [recipes, setRecipes] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  const categoryNames = {
    soup: { tr: "Global Çorbalar", en: "Global Soups" },
    starter: { tr: "Dünya Başlangıçları", en: "World Starters" },
    main: { tr: "Dünya Ana Yemekleri", en: "World Main Dishes" },
    dessert: { tr: "Global Tatlılar", en: "Global Desserts" }
  };

  const getImageUrl = (url) => {
    if (!url) return "/hero-image.jpg";
    if (url.startsWith('http')) return url; 
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`; 
  };

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler/mutfak/world?t=${new Date().getTime()}`);
      const filtered = res.data.filter(r => r.category === category);
      setRecipes(filtered);
      setOriginalRecipes(filtered);
    } catch (error) { 
      console.error("Dünya mutfağı tarifleri çekilemedi!", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 2) {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler/ara?term=${searchTerm}&t=${new Date().getTime()}`);
          const categorySpecificSearch = res.data.filter(r => 
            r.cuisine === 'world' && r.category === category
          );
          setRecipes(categorySpecificSearch);
        } catch (error) {
          console.error("Dünya mutfağında arama başarısız!", error);
        }
      } else if (searchTerm.length === 0) {
        setRecipes(originalRecipes); 
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, originalRecipes, category]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <Link 
            href="/world-cuisine"
            className="group inline-flex items-center text-amber-800 font-bold text-lg hover:text-amber-600 transition-colors"
          >
            <span className="mr-2 transform group-hover:-translate-x-2 transition-transform">←</span>
            {language === 'tr' ? "Dünya Mutfağı'na Geri Dön" : "Back to World Cuisine"}
          </Link>

          <div className="relative w-full md:w-80">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'tr' ? "Bu kategoride ara..." : "Search in this category..."}
              className="w-full px-5 py-3 rounded-2xl border border-amber-100 shadow-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all text-gray-800"
            />
            <span className="absolute right-4 top-3 opacity-30 text-xl">🔍</span>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-amber-900">
            {categoryNames[category] 
              ? (language === 'tr' ? categoryNames[category].tr : categoryNames[category].en)
              : category 
            }
          </h1>
          <div className="h-1 w-20 bg-amber-500 mt-4 rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse text-amber-800 font-bold text-xl italic">
             {language === 'tr' ? "Dünya Lezzetleri Hazırlanıyor..." : "World Flavors Preparing..."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recipes.length > 0 ? (
              recipes.map(r => (
                <Link 
                  href={`/recipe/${r.slug}`} 
                  key={r.slug} 
                  className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-amber-50"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={getImageUrl(r.image_url)} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={language === 'tr' ? r.title_tr : r.title_en}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-amber-900 shadow-sm uppercase">
                       {language === 'tr' ? 'Dünya' : 'World'}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-amber-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                      {language === 'tr' ? r.title_tr : r.title_en}
                    </h3>
                    <p className="text-amber-500 font-bold mt-4 flex items-center">
                      {language === 'tr' ? "Tarifi İncele" : "View Details"}
                      <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-amber-100">
                <p className="text-gray-400 text-xl italic font-light">
                  {language === 'tr' ? "Aradığınız lezzet bu kategoride bulunamadı." : "No such flavor found in this category."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}