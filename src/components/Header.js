"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext'; 
import { useState, useEffect, useRef } from 'react'; 
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { showModal } = useModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [user, setUser] = useState(null); 
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef(null);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) { 
          console.error("User parse error", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    setIsMobileMenuOpen(false);

    return () => {
      window.removeEventListener('storage', checkUser);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsProfileMenuOpen(false);
    showModal(language === 'tr' ? "Başarıyla çıkış yapıldı. 🌱" : "Logged out successfully. 🌱", "success");
    router.push('/');
  };

  const setLang = (targetLang) => {
    if (language !== targetLang) toggleLanguage();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${searchTerm.toLowerCase()}`);
    setSearchTerm(""); 
    setIsMobileMenuOpen(false); 
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group z-50">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shadow-sm transition-all group-hover:bg-green-100 group-hover:scale-105 overflow-hidden">
              <img 
                src="/logo.png" 
                alt="VegRoot Logo" 
                loading="lazy" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-2xl font-serif font-bold text-green-900 tracking-tight">VegRoot</span>
          </Link>

          {/* MASAÜSTÜ MENÜ */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/aegean-cuisine" className="text-sm font-bold text-gray-600 hover:text-green-700 transition-colors uppercase">
              {language === 'tr' ? 'Ege Mutfağı' : 'Aegean Cuisine'}
            </Link>
            <Link href="/world-cuisine" className="text-sm font-bold text-gray-600 hover:text-green-700 transition-colors uppercase">
              {language === 'tr' ? 'Dünya Mutfağı' : 'World Cuisine'}
            </Link>
            <Link href="/our-story" className="text-sm font-bold text-gray-600 hover:text-green-700 transition-colors uppercase">
              {language === 'tr' ? 'Hikayemiz' : 'Our Story'}
            </Link>
          </div>

          <div className="flex items-center gap-4 z-50">
            {/* MASAÜSTÜ ARAMA */}
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'tr' ? "Tarif ara..." : "Search..."}
                className="bg-gray-50 border border-gray-200 rounded-full py-2 px-4 pl-9 text-sm focus:ring-2 focus:ring-green-500 outline-none w-32 focus:w-48 transition-all text-gray-800"
              />
              <span className="absolute left-3 top-2.5 opacity-40">🔍</span>
            </form>

            {/* DİL SEÇİCİ */}
            <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1 border border-gray-100">
              <button onClick={() => setLang('tr')} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${language === 'tr' ? 'bg-white shadow-sm' : 'opacity-30'}`}>
                <img 
                  src="https://flagcdn.com/w40/tr.png" 
                  className="w-5 h-5 rounded-full" 
                  alt="TR" 
                  loading="lazy"
                />
              </button>
              <button onClick={() => setLang('en')} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${language === 'en' ? 'bg-white shadow-sm' : 'opacity-30'}`}>
                <img 
                  src="https://flagcdn.com/w40/us.png" 
                  className="w-5 h-5 rounded-full" 
                  alt="EN" 
                  loading="lazy"
                />
              </button>
            </div>

            {/* PROFİL MENÜSÜ */}
            {user ? (
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 hover:bg-green-100 transition-all active:scale-95"
                >
                  <span className="text-sm font-bold text-green-900 hidden sm:block">{user.username}</span>
                  <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {(user?.username?.[0] || "V").toUpperCase()}
                  </div>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-[1.5rem] shadow-2xl border border-green-50 p-2 overflow-hidden">
                    {user?.role?.toLowerCase() === 'admin' && (
                      <Link href="/admin" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 rounded-xl transition-colors">
                        ⚙️ {language === 'tr' ? 'Şef Paneli' : 'Chef Panel'}
                      </Link>
                    )}
                    
                    <Link 
                      href="/settings" 
                      onClick={() => setIsProfileMenuOpen(false)} 
                      className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 rounded-xl transition-colors"
                    >
                      🔐 {language === 'tr' ? 'Şifre Değiştir' : 'Change Password'}
                    </Link>

                    <div className="h-px bg-gray-100 my-1 mx-2"></div>

                    <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      🚪 {language === 'tr' ? 'Çıkış Yap' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden md:block bg-green-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-800 transition-all shadow-md">
                {language === 'tr' ? 'Giriş Yap' : 'Login'}
              </Link>
            )}

            {/* MOBİL MENÜ BUTONU */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-green-900 transition-transform active:scale-90">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBİL MENÜ */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top duration-300">
          
          {/* MOBİL ARAMA KUTUSU */}
          <form onSubmit={handleSearch} className="relative mb-2">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'tr' ? "Tarif ara..." : "Search..."}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 pl-10 text-sm focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
            />
            <span className="absolute left-3 top-3.5 opacity-40">🔍</span>
          </form>

          <Link href="/aegean-cuisine" className="font-bold text-gray-700 border-b pb-2 hover:text-green-700 transition-colors">
            {language === 'tr' ? 'Ege Mutfağı' : 'Aegean Cuisine'}
          </Link>
          <Link href="/world-cuisine" className="font-bold text-gray-700 border-b pb-2 hover:text-green-700 transition-colors">
            {language === 'tr' ? 'Dünya Mutfağı' : 'World Cuisine'}
          </Link>
          <Link href="/our-story" className="font-bold text-gray-700 border-b pb-2 hover:text-green-700 transition-colors">
            {language === 'tr' ? 'Hikayemiz' : 'Our Story'}
          </Link>
          
          {user && (
            <Link href="/settings" className="font-bold text-gray-700 border-b pb-2 hover:text-green-700 transition-colors">
              🔐 {language === 'tr' ? 'Şifre Değiştir' : 'Change Password'}
            </Link>
          )}

          {!user ? (
            <Link href="/login" className="bg-green-900 text-white text-center py-3 rounded-xl font-bold hover:bg-green-800 transition-all">
              {language === 'tr' ? 'Giriş Yap' : 'Login'}
            </Link>
          ) : (
            <button onClick={handleLogout} className="bg-red-50 text-red-600 text-center py-3 rounded-xl font-bold hover:bg-red-100 transition-all shadow-sm">
              {language === 'tr' ? 'Çıkış Yap' : 'Logout'}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}