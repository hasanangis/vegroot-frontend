"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function AegeanContent() {
  const { category } = useParams(); 
  const { language } = useLanguage();
  const [recipes, setRecipes] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  const categoryNames = {
    soup: { tr: "Ege Çorbaları", en: "Aegean Soups" },
    starter: { tr: "Zeytinyağlılar & Başlangıçlar", en: "Olive Oil Dishes & Starters" },
    main: { tr: "Ege'den Ana Yemekler", en: "Main Dishes from Aegean" },
    dessert: { tr: "Ege Tatlıları", en: "Aegean Desserts" }
  };

  const getImageUrl = (url) => {
    if (!url) return "/hero-image.jpg";
    if (url.startsWith('http')) return url; 
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`; 
  };

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler/mutfak/aegean?t=${new Date().getTime()}`);
      const filtered = res.data.filter(r => r.category === category);
      setRecipes(filtered);
      setOriginalRecipes(filtered); 
    } catch (error) { 
      console.error("Ege tarifleri çekilemedi!", error);
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
          const filtered = res.data.filter(r => 
            r.cuisine === 'aegean' && r.category === category
          );
          setRecipes(filtered);
        } catch (error) {
          console.error("Ege mutfağında arama başarısız!", error);
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
            href="/aegean-cuisine"
            className="group inline-flex items-center text-green-800 font-bold text-lg hover:text-green-600 transition-colors"
          >
            <span className="mr-2 transform group-hover:-translate-x-2 transition-transform">←</span>
            {language === 'tr' ? "Ege Mutfağı'na Geri Dön" : "Back to Aegean Cuisine"}
          </Link>
          <div className="relative w-full md:w-80">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder={language === 'tr' ? "Kategori içinde ara..." : "Search in category..."}
              className="w-full px-5 py-3 rounded-2xl border border-green-100 shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all text-gray-800"
            />
            <span className="absolute right-4 top-3 opacity-30 text-xl">🔍</span>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-green-900">
            {categoryNames[category] 
              ? (language === 'tr' ? categoryNames[category].tr : categoryNames[category].en)
              : category 
            }
          </h1>
          <div className="h-1 w-20 bg-amber-500 mt-4 rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse text-green-800 font-bold text-xl italic">
            {language === 'tr' ? "Mutfak Hazırlanıyor..." : "Kitchen Preparing..."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recipes.length > 0 ? (
              recipes.map(r => (
                <Link 
                  href={`/recipe/${r.slug}`} 
                  key={r.slug} 
                  className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-green-50"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={getImageUrl(r.image_url)} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={language === 'tr' ? r.title_tr : r.title_en}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 px-4 py-1 rounded-full text-xs font-bold text-green-800 shadow-sm uppercase">
                        {language === 'tr' ? 'Ege' : 'Aegean'}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-green-900 group-hover:text-green-700 transition-colors line-clamp-1">
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
              <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-green-100">
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