"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext'; 
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AdminDashboard() {
  const { language } = useLanguage();
  const { showModal } = useModal(); 
  const router = useRouter();

  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const [newPassword, setNewPassword] = useState(''); 
  const [searchTerm, setSearchTerm] = useState("");

  const [recipe, setRecipe] = useState({
    title_tr: '', title_en: '', instructions_tr: '', instructions_en: '',
    malzemeler_tr: '', malzemeler_en: '', cuisine: 'aegean', category: 'starter'
  });

  const getImageUrl = (url) => {
    if (!url) return "/hero-image.jpg";
    if (url.startsWith('http')) return url; 
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`; 
  };

  
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    
    let userData = {};
    try {
      userData = userString ? JSON.parse(userString) : {};
      setUser(userData);
    } catch (error) { 
      console.error("Auth hatası", error);
    }
    
    if (!token || userData.role !== 'admin') {
      router.push('/'); 
    } else {
      setIsAuthorized(true);
      fetchAllRecipes();
    }
  }, [router]);

  const fetchAllRecipes = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler`);
      setAllRecipes(res.data);
    } catch (error) { 
      console.error("Liste yüklenemedi", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return showModal(language === 'tr' ? "Görsel seç!" : "Select image!", "error");
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('title_tr', recipe.title_tr);
      formData.append('title_en', recipe.title_en);
      formData.append('instructions_tr', recipe.instructions_tr);
      formData.append('instructions_en', recipe.instructions_en);
      formData.append('cuisine', recipe.cuisine);
      formData.append('category', recipe.category);
      formData.append('malzemeler_tr', recipe.malzemeler_tr);
      formData.append('malzemeler_en', recipe.malzemeler_en);

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tarifler`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      setRecipe({ title_tr: '', title_en: '', instructions_tr: '', instructions_en: '', malzemeler_tr: '', malzemeler_en: '', cuisine: 'aegean', category: 'starter' });
      setSelectedImage(null);
      fetchAllRecipes();
      showModal(language === 'tr' ? "Mühürlendi! ✅" : "Sealed! ✅", "success");
    } catch (error) {
      console.error(error);
      showModal(language === 'tr' ? "Hata oluştu!" : "An error occurred!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-8 font-serif">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-green-900">
          {language === 'tr' ? 'Şef Paneli' : 'Chef Panel'}
        </h1>
        
        {/* YENİ TARİF FORMU */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl space-y-6 border border-green-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              required 
              placeholder={language === 'tr' ? "Tarif Adı (TR)" : "Recipe Title (TR)"} 
              value={recipe.title_tr} 
              onChange={(e) => setRecipe({...recipe, title_tr: e.target.value})} 
              className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all" 
            />
            <input 
              required 
              placeholder={language === 'tr' ? "Tarif Adı (EN)" : "Recipe Title (EN)"} 
              value={recipe.title_en} 
              onChange={(e) => setRecipe({...recipe, title_en: e.target.value})} 
              className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all" 
            />
          </div>
          
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])} 
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />

          <button disabled={isLoading} className="w-full py-4 bg-green-900 text-white rounded-xl font-bold hover:bg-green-800 transition-all active:scale-[0.98]">
            {isLoading ? "..." : (language === 'tr' ? "Yayınla 🚀" : "Publish 🚀")}
          </button>
        </form>

        {/* MEVCUT TARİFLER LİSTESİ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRecipes.map(r => (
            <div key={r.id} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <img 
                  src={getImageUrl(r.image_url)} 
                  loading="lazy" 
                  className="w-14 h-14 rounded-xl object-cover shadow-sm" 
                  alt={r.title_tr} 
                />
                <span className="font-bold text-gray-800">{language === 'tr' ? r.title_tr : r.title_en}</span>
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-green-600 opacity-50">{r.cuisine}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}