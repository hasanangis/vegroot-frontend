"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext';

export default function WorldSoups() {
  const { language } = useLanguage();
  const [soups, setSoups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoups = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler`);
        
       
        const filtered = response.data.filter(r => 
          r.category?.toLowerCase().includes('world-soup') || 
          r.category === 'Dünya Çorbaları'
        );
        
        setSoups(filtered);
      } catch (error) {
        console.error("Dünya çorbaları yüklenirken kepçe kırıldı!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSoups();
  }, []);

  
  const getImageUrl = (url) => {
    if (!url) return "/hero-image.jpg";
    if (url.startsWith('http')) return url; 
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`; 
  };

  const text = {
    back: { tr: "← DÜNYA MUTFAĞINA DÖN", en: "← BACK TO WORLD CUISINE" },
    header: { tr: "Dünya Çorbaları", en: "Global Soups" },
    subHeader: { 
      tr: "Farklı kültürlerin iç ısıtan başlangıçları.", 
      en: "Heart-warming starters from different cultures." 
    },
    vegan: { tr: "Vegan", en: "Vegan" }
  };

  if (loading) return <div className="text-center py-20 italic text-amber-600">Kazanlar kaynıyor... 🍜</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-6">
      
      <div className="text-center mb-16">
        <Link 
          href="/world-cuisine" 
          className="text-amber-600 font-bold text-sm tracking-widest uppercase mb-4 inline-block hover:underline"
        >
          {text.back[language]}
        </Link>
        <span className="block text-amber-600 font-bold tracking-wider uppercase text-xs mt-2">
          {language === 'tr' ? 'Sıcak & Global' : 'Warm & Global'}
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-3 mb-6">
          {text.header[language]}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto italic">
          {text.subHeader[language]}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {soups.length > 0 ? (
          soups.map((soup) => (
            <Link 
              href={`/recipe/${soup.id}`} 
              key={soup.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={getImageUrl(soup.image_url)} 
                  alt={language === 'tr' ? soup.title_tr : soup.title_en}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-amber-600 text-xs font-bold shadow-sm flex items-center gap-1">
                  🌱 {text.vegan[language]}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  {language === 'tr' ? soup.title_tr : soup.title_en}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {language === 'tr' ? soup.description_tr : soup.description_en}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">⏰</span> {soup.prep_time}
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-orange-500">🔥</span> {soup.calories} kcal
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400 italic">
            {language === 'tr' 
              ? "Dünya mutfağından henüz bir çorba mühürlemedik. 🍜" 
              : "No global soups sealed yet. 🍜"}
          </div>
        )}
      </div>
    </div>
  );
}