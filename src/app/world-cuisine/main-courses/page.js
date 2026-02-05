"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext';

export default function WorldMainCourses() {
  const { language } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler`);
        
       
        const filtered = response.data.filter(r => 
          r.category?.toLowerCase().includes('world-main') || 
          r.category === 'Dünya Ana Yemekleri'
        );
        
        setCourses(filtered);
      } catch (error) {
        console.error("Dünya lezzetleri yüklenirken mutfakta yangın çıktı!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  
  const getImageUrl = (url) => {
    if (!url) return "/hero-image.jpg";
    if (url.startsWith('http')) return url; 
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`; 
  };

  const text = {
    back: { tr: "← DÜNYA MUTFAĞINA DÖN", en: "← BACK TO WORLD CUISINE" },
    header: { tr: "Dünya Lezzetleri", en: "World Flavors" },
    subHeader: { 
      tr: "Farklı kıtalardan doyurucu ve bitkisel ana yemekler.", 
      en: "Satisfying plant-based main courses from different continents." 
    },
    vegan: { tr: "Vegan", en: "Vegan" }
  };

  if (loading) return <div className="text-center py-20 italic text-amber-600">Global lezzetler hazırlanıyor... 🌍</div>;

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
          {language === 'tr' ? 'Doyurucu & Global' : 'Hearty & Global'}
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-3 mb-6">
          {text.header[language]}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto italic">
          {text.subHeader[language]}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((food) => (
            <Link 
              href={`/recipe/${food.id}`} 
              key={food.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={getImageUrl(food.image_url)} 
                  alt={language === 'tr' ? food.title_tr : food.title_en}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-amber-600 text-xs font-bold shadow-sm flex items-center gap-1">
                  🌱 {text.vegan[language]}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  {language === 'tr' ? food.title_tr : food.title_en}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {language === 'tr' ? food.description_tr : food.description_en}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">⏰</span> {food.prep_time}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">🔥</span> {food.calories} kcal
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400 italic">
            {language === 'tr' 
              ? "Bu kıtada henüz bir ana yemek mühürlemedik. 🌍" 
              : "No main courses sealed on this continent yet. 🌍"}
          </div>
        )}
      </div>
    </div>
  );
}