"use client";
import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useModal } from "../../context/ModalContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const { language } = useLanguage();
  const { showModal } = useModal();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const cleanUsername = username.trim();
      const cleanPassword = password.trim();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        { username: cleanUsername, password: cleanPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      
      const token = response?.data?.token;
      const user = response?.data?.user;

      if (!token || !user) {
        throw new Error("Invalid login response: token/user missing");
      }

      localStorage.setItem("token", token);

      
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user?.id,
          username: user?.username,
          role: user?.role,
        })
      );

      
      window.dispatchEvent(new Event("storage"));

      showModal(
        language === "tr"
          ? "Hoş geldiniz! Giriş başarılı. 🌱"
          : "Welcome back! Login successful. 🌱",
        "success"
      );

      router.push("/");
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      const apiError =
        err?.response?.data?.message_tr ||
        err?.response?.data?.error ||
        err?.message;

      const finalError =
        apiError ||
        (language === "tr"
          ? "Giriş başarısız! Bilgileri kontrol edin."
          : "Login failed! Please check your credentials.");

      setError(finalError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] py-20 px-4">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
          <img
            src="/login-resim.jpg"
            alt="Vegan Login"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900/40 flex flex-col justify-end p-8 text-white font-serif">
            <h3 className="text-3xl font-bold mb-2">VegRoot.</h3>
            <p className="opacity-90 text-sm italic">
              {language === "tr"
                ? "Doğanın lezzetine katılın."
                : "Join the taste of nature."}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-900 mb-2 font-serif">
            {language === "tr" ? "Hoş Geldiniz" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mb-8 italic">
            {language === "tr" ? "Hesabınıza giriş yapın" : "Login to your account"}
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-green-800 mb-2 uppercase tracking-widest">
                {language === "tr" ? "Kullanıcı Adı" : "Username"}
              </label>
              <input
                type="text"
                required
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
                spellCheck="false"
                placeholder={
                  language === "tr"
                    ? "Kullanıcı adınızı giriniz"
                    : "Enter your username"
                }
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-gray-800"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-green-800 uppercase tracking-widest">
                  {language === "tr" ? "Şifre" : "Password"}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-green-700 hover:text-green-900 font-medium italic transition-colors"
                >
                  {language === "tr" ? "Şifremi Unuttum?" : "Forgot Password?"}
                </Link>
              </div>
              <input
                type="password"
                required
                autoCapitalize="none"
                autoCorrect="off"
                placeholder={language === "tr" ? "••••••••" : "********"}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-bold bg-red-50 p-2 rounded-lg text-center border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-green-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/20 flex justify-center items-center gap-2
                ${
                  isLoading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:bg-green-800 transform hover:scale-[1.02]"
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  {language === "tr" ? "Giriş Yapılıyor..." : "Signing In..."}
                </>
              ) : language === "tr" ? (
                "Giriş Yap"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-gray-500 text-sm font-medium">
            {language === "tr" ? "Hesabınız yok mu?" : "Don't have an account?"}
            <Link
              href="/register"
              className="text-green-600 font-bold ml-2 hover:underline"
            >
              {language === "tr" ? "Kayıt Ol" : "Sign Up"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
