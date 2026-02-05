"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SettingsPage() {
  const { language } = useLanguage();
  const { showModal } = useModal();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      return showModal(
        language === 'tr' ? "Yeni şifreler eşleşmiyor!" : "New passwords do not match!", 
        "error"
      );
    }

    if (passwords.newPassword.length < 6) {
      return showModal(
        language === 'tr' ? "Şifre en az 6 karakter olmalıdır!" : "Password must be at least 6 characters!", 
        "error"
      );
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`, 
        { 
          oldPassword: passwords.currentPassword, 
          newPassword: passwords.newPassword 
        }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showModal(
        language === 'tr' ? "Şifreniz başarıyla mühürlendi! ✅" : "Password successfully updated! ✅", 
        "success"
      );
      
      
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
    } catch (err) {
      showModal(
        language === 'tr' ? "Şifre güncellenemedi! Lütfen mevcut şifrenizi kontrol edin." : "Failed to update password! Please check your current password.", 
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#FDFBF7] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl border border-green-50 p-8 md:p-12 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
            <span className="text-3xl">🔑</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-green-900">
            {language === 'tr' ? "Şifre Ayarları" : "Password Settings"}
          </h1>
          <p className="text-gray-400 mt-2 text-sm italic">
            {language === 'tr' ? "Hesap güvenliğinizi güncelleyin" : "Update your account security"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-green-800 uppercase tracking-widest ml-1">
              {language === 'tr' ? "Mevcut Şifre" : "Current Password"}
            </label>
            <input
              required
              type="password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="h-px bg-gray-100 my-2"></div>

          
          <div className="space-y-2">
            <label className="text-xs font-bold text-green-800 uppercase tracking-widest ml-1">
              {language === 'tr' ? "Yeni Şifre" : "New Password"}
            </label>
            <input
              required
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          
          <div className="space-y-2">
            <label className="text-xs font-bold text-green-800 uppercase tracking-widest ml-1">
              {language === 'tr' ? "Yeni Şifre Tekrar" : "Confirm New Password"}
            </label>
            <input
              required
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-4 bg-green-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-800 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading 
              ? (language === 'tr' ? "Güncelleniyor..." : "Updating...") 
              : (language === 'tr' ? "Şifreyi Güncelle" : "Update Password")}
          </button>
          
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full text-sm font-bold text-gray-400 hover:text-green-800 transition-colors"
          >
            {language === 'tr' ? "Vazgeç" : "Cancel"}
          </button>
        </form>
      </div>
    </div>
  );
}