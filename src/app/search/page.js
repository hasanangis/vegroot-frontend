"use client";
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get('q') || "";
  const { language } = useLanguage();

  const [ingredientInput, setIngredientInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImageUrl = (url) => {
    if (!url) return "/hero-image.jpg";
    if (url.startsWith('http')) return url; 
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`; 
  };

  
  const handleRandomRecipe = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler`);
      const allRecipes = res.data;

      if (allRecipes && allRecipes.length > 0) {
        const randomIndex = Math.floor(Math.random() * allRecipes.length);
        const randomRecipe = allRecipes[randomIndex];
        
        
        const target = randomRecipe.slug || randomRecipe.id;
        window.location.href = `/recipe/${target}`;
      }
    } catch (error) { 
      console.error("Rastgele tarif seçilemedi!", error);
    }
  };

  const performSearch = useCallback(async (searchTerm, ingredients) => {
    try {
      setLoading(true);
      
      if (!searchTerm && ingredients.length === 0) {
        setResults([]);
        return;
      }

      const mainTerm = ingredients.length > 0 ? ingredients[0] : searchTerm;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tarifler/ara?term=${encodeURIComponent(mainTerm)}`);
      
      let finalResults = res.data;

      if (ingredients.length > 1) {
        finalResults = res.data.filter(recipe => {
          const recipeIngredients = JSON.stringify(
            language === 'tr' ? recipe.malzemeler_tr : recipe.malzemeler_en
          ).toLowerCase();
          
          return ingredients.every(ing => recipeIngredients.includes(ing.toLowerCase()));
        });
      }
      
      setResults(finalResults);
    } catch (error) {
      console.error("Mutfak arama motoru hata verdi!", error);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    performSearch(queryFromUrl, selectedIngredients);
  }, [queryFromUrl, selectedIngredients, performSearch]);

  const addIngredient = (e) => {
    e.preventDefault();
    const cleanInput = ingredientInput.trim();
    if (cleanInput && !selectedIngredients.includes(cleanInput)) {
      setSelectedIngredients([...selectedIngredients, cleanInput]);
      setIngredientInput("");
    }
  };

  const removeIngredient = (ing) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* DOLABIMDA NE VAR BÖLÜMÜ */}
        <div className="mb-12 bg-white p-8 rounded-[2.5rem] shadow-xl border border-green-50 transform hover:scale-[1.01] transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-green-900 flex items-center gap-3">
              <span className="text-3xl">🧺</span>
              {language === 'tr' ? "Dolabımda Ne Var?" : "What's in the pantry?"}
            </h2>
            {selectedIngredients.length > 0 && (
              <button 
                onClick={() => setSelectedIngredients([])}
                className="text-sm text-red-400 hover:text-red-600 font-bold"
              >
                {language === 'tr' ? "Temizle" : "Clear All"}
              </button>
            )}
          </div>
          
          <form onSubmit={addIngredient} className="flex flex-col sm:flex-row gap-3 mb-6">
            <input 
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              placeholder={language === 'tr' ? "Malzeme ekle (Örn: Havuç)" : "Add ingredient (e.g. Carrot)"}
              className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-green-600 outline-none transition-all text-gray-800 shadow-inner"
            />
            <div className="flex gap-2">
              <button 
                type="submit"
                className="flex-1 sm:flex-none bg-green-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-800 transition-all active:scale-95 shadow-lg"
              >
                {language === 'tr' ? "Ekle" : "Add"}
              </button>
              
              <button 
                type="button"
                onClick={handleRandomRecipe}
                className="flex-1 sm:flex-none bg-amber-500 text-white px-6 py-4 rounded-2xl font-bold hover:bg-amber-600 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                🎲 <span className="hidden sm:inline">{language === 'tr' ? "Rastgele" : "Random"}</span>
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-3">
            {selectedIngredients.map((ing, index) => (
              <span key={index} className="bg-green-100 text-green-900 px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-green-200 animate-in fade-in zoom-in duration-300">
                {ing}
                <button onClick={() => removeIngredient(ing)} className="hover:bg-green-200 rounded-full w-5 h-5 flex items-center justify-center transition-colors">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* SONUÇ BAŞLIĞI */}
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-serif font-bold text-green-900">
            {loading ? (language === 'tr' ? "Kazan Kaynıyor..." : "Chef is cooking...") : 
              results.length > 0 ? (language === 'tr' ? `${results.length} Harika Tarif Bulundu` : `${results.length} Great Recipes Found`) :
              (language === 'tr' ? "Sonuç Yok" : "No Results")}
          </h1>
          <span className="text-gray-400 italic text-sm">VegRoot Kitchen v1.0</span>
        </div>

        {/* SONUÇ LİSTESİ */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {results.map((recipe) => (
              <Link href={`/recipe/${recipe.slug}`} key={recipe.slug} className="group">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={getImageUrl(recipe.image_url)} 
                      alt={recipe.title_tr} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-green-900 shadow-sm">
                      {recipe.cuisine === 'aegean' ? (language === 'tr' ? 'Ege' : 'Aegean') : (language === 'tr' ? 'Dünya' : 'World')}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 font-serif mb-2 group-hover:text-green-700 transition-colors">
                        {language === 'tr' ? recipe.title_tr : recipe.title_en}
                      </h3>
                      <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                        {recipe.category}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between text-green-900 font-bold">
                      <span className="text-sm underline decoration-2 underline-offset-4">{language === 'tr' ? "Tarife Git" : "View Recipe"}</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : !loading && (
          <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-gray-100 shadow-inner">
            <div className="text-6xl mb-6">🏜️</div>
            <p className="text-2xl text-gray-400 italic font-serif">
              {language === 'tr' ? "Bu malzemelerle henüz bir tarif mühürlemedik." : "No recipes sealed with these ingredients yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-green-900">Mutfak Hazırlanıyor...</div>}>
      <SearchResultsContent /> 
    </Suspense>
  );
}