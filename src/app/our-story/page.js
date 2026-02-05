"use client";

import { useLanguage } from '../../context/LanguageContext';

export default function OurStory() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      
      
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center">
        
        <img 
          src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=1920" 
          alt="Aegean Olive Grove" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-green-950/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <span className="block text-green-200 font-bold tracking-[0.2em] mb-4 uppercase">
            {language === 'tr' ? "Köklerimize Dönüş" : "Return to Roots"}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight shadow-lg">
            {language === 'tr' ? "Ege'nin Kadim Mirası" : "Ancient Heritage of Aegean"}
          </h1>
        </div>
      </div>

     
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-green-900">
              {language === 'tr' ? "Toprağın Bereketi, Doğanın Şifası." : "Abundance of Soil, Healing of Nature."}
            </h2>
            
            <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-green-600 pl-4 bg-green-50/50 py-2">
              {language === 'tr' 
                ? "\"Dünya veganlığı yeni bir akım sanıyor olabilir; ama Ege insanı binlerce yıldır bu bilgelikle yaşıyor.\""
                : "\"The world may think veganism is a new trend; but Aegean people have lived with this wisdom for thousands of years.\""}
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              {language === 'tr' 
                ? "Bizim topraklarımızda yemek, sadece karın doyurmak değildir; toprağa, güneşe ve yağmura duyulan saygıdır. Ege kültüründe otların yeri bambaşkadır; şifadır, berekettir ve yaşamın ta kendisidir."
                : "In our lands, food is not just about feeding; it is respect for the soil, the sun, and the rain. In Aegean culture, herbs have a unique place; they are healing, abundance, and life itself."}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              {language === 'tr'
                ? "VegRoot olarak amacımız, bu kadim kültürü modern dünyaya hatırlatmak. Doğaya hükmetmek yerine onunla uyum içinde yaşamak. Tabağınızdaki her lezzet, binlerce yıllık bir hikayenin devamı."
                : "As VegRoot, our goal is to remind the modern world of this ancient culture. To live in harmony with nature instead of dominating it. Every flavor on your plate is the continuation of a thousand-year-old story."}
            </p>
            
            <div className="pt-6">
              <span className="text-green-800 font-serif font-bold text-xl block">VegRoot.</span>
              <span className="text-sm text-gray-400 font-medium mt-1 block">Since 2026</span>
            </div>
          </div>

          
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-green-900/10 rounded-[2rem] transform -rotate-3"></div>
            
           
            <img 
              src="/hikaye-otlar.jpg" 
              alt="Fresh Aegean Herbs" 
              className="relative rounded-[2rem] shadow-2xl w-full h-auto transform rotate-2 hover:rotate-0 transition-transform duration-700"
            />
            
          </div>

        </div>
      </section>

      
      <section className="bg-green-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-green-700">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-3">{language === 'tr' ? "Yaşama Saygı" : "Respect for Life"}</h3>
            <p className="text-gray-600 text-sm">
              {language === 'tr' ? "Tüm canlıların yaşam hakkını savunuyor, sofralarımızı şefkatle kuruyoruz." : "We defend the right to life of all beings and set our tables with compassion."}
            </p>
          </div>

          
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-green-700">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-3">{language === 'tr' ? "Kadim Miras" : "Ancient Legacy"}</h3>
            <p className="text-gray-600 text-sm">
              {language === 'tr' ? "Ege'nin binlerce yıllık 'ot kültürü'nü koruyor ve geleceğe taşıyoruz." : "We preserve the thousand-year-old 'herb culture' of the Aegean and carry it to the future."}
            </p>
          </div>

          
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-green-700">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-3">{language === 'tr' ? "Toprak Ana" : "Mother Earth"}</h3>
            <p className="text-gray-600 text-sm">
              {language === 'tr' ? "Kimyasal yok, yapaylık yok. Sadece toprağın bize sunduğu saf bereket var." : "No chemicals, no artificiality. Just the pure abundance the soil offers us."}
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}