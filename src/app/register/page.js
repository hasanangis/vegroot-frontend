"use client";
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext'; 
import { useModal } from '../../context/ModalContext'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
  const { language } = useLanguage();
  const { showModal } = useModal(); 
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

 const handleRegister = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      username,
      email,
      password
    });

    showModal(
      language === 'tr' 
        ? "Kayıt Başarılı! Aramıza hoş geldin. 🌱" 
        : "Registration Successful! Welcome aboard. 🌱", 
      "success"
    );
    
    router.push('/login'); 
    
  } catch (err) {
    
    const msg_tr = err.response?.data?.message_tr;
    const msg_en = err.response?.data?.error;
    
    
    const finalError = language === 'tr' 
      ? (msg_tr || "Kayıt sırasında bir hata oluştu!") 
      : (msg_en || "An error occurred during registration!");
    
    setError(finalError);
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] py-20 px-4">
      <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-900 mb-2">
            {language === 'tr' ? "Kayıt Ol" : "Join Us"}
          </h2>
          <p className="text-gray-500 mb-8">
            {language === 'tr' ? "Yeni lezzet yolculuğuna başla" : "Start your flavor journey"}
          </p>

          <form className="space-y-4" onSubmit={handleRegister}>
            
            <div>
              <label className="block text-sm font-bold text-green-800 mb-2 uppercase tracking-widest">
                {language === 'tr' ? "Kullanıcı Adı" : "Username"}
              </label>
              <input 
                type="text" 
                required
                placeholder={language === 'tr' ? "Kullanıcı adınızı belirleyin" : "Choose a username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-green-800 mb-2 uppercase tracking-widest">
                {language === 'tr' ? "E-posta Adresi" : "Email Address"}
              </label>
              <input 
                type="email" 
                required
                placeholder="hello@vegroot.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-green-800 mb-2 uppercase tracking-widest">
                {language === 'tr' ? "Şifre" : "Password"}
              </label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
              {/* Şifre Kriteri Bilgilendirmesi (UX) */}
              <p className="mt-1.5 text-[11px] text-gray-400 italic">
                {language === 'tr' 
                  ? "ℹ️ Şifre en az 5 harf (1 büyük) ve 5 rakam içermeli." 
                  : "ℹ️ Must contain at least 5 letters (1 uppercase) and 5 digits."}
              </p>
            </div>

            {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-2 rounded-lg text-center">{error}</p>}

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-green-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/20 flex justify-center items-center gap-2 mt-6 active:scale-95
                ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-800 transform hover:scale-[1.02]'}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'tr' ? "Kayıt Yapılıyor..." : "Registering..."}
                </>
              ) : (
                language === 'tr' ? "Kayıt Ol" : "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-gray-500 text-sm">
            {language === 'tr' ? "Zaten hesabınız var mı?" : "Already have an account?"}
            <Link href="/login" className="text-green-600 font-bold ml-2 hover:underline">
              {language === 'tr' ? "Giriş Yap" : "Login"}
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
          <img 
            src="/login-resim.jpg" 
            alt="Vegan Register" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900/40 flex flex-col justify-end p-8 text-white">
            <h3 className="text-3xl font-serif font-bold mb-2">VegRoot</h3>
            <p className="opacity-90 text-sm">
              {language === 'tr' ? "Topraktan sofraya, doğallığı keşfet." : "Discover naturalness from soil to table."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}