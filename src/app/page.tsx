'use client';

import { useState } from 'react';
import content from '../content.json';

const c = content as {
  businessName: string;
  tagline: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  colors: { primary: string; secondary: string; accent: string };
  menuCategories: string[];
  menuItems: { name: string; description: string; price: string; category: string; icon: string }[];
  features: { title: string; description: string; icon: string }[];
  about: string;
  workingHours: { days: string; hours: string }[];
  testimonials: { name: string; text: string; role: string }[];
  faq: { question: string; answer: string }[];
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
  socialLinks: { twitter: string; instagram: string };
  location: string;
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(c.menuCategories?.[0] || 'الكل');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredMenu = activeCategory === 'الكل' || activeCategory === 'All'
    ? (c.menuItems || [])
    : (c.menuItems || []).filter(item => item.category === activeCategory);

  const whatsappLink = `https://wa.me/${(c.whatsappNumber || c.contactPhone || '').replace(/[^0-9]/g, '')}`;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <span className="text-xl font-bold text-primary">{c.businessName}</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#menu" className="text-gray-600 hover:text-primary transition-colors">القائمة</a>
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors">مميزاتنا</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">من نحن</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">آراء العملاء</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">تواصل معنا</a>
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
            className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
            {c.heroCTA || 'اطلب الآن'}
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-16 min-h-[80vh] flex items-center justify-center text-center text-white"
        style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))` }}>
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">{c.heroTitle}</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">{c.heroSubtitle}</p>
          <a href="#menu"
            className="inline-block bg-accent text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg">
            {c.heroCTA || 'اطلب الآن'}
          </a>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">قائمة الطعام</h2>
          <p className="text-gray-500 text-center mb-10">{c.tagline}</p>

          {c.menuCategories && c.menuCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {c.menuCategories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-lg">{item.price}</span>
                  <a href={`${whatsappLink}?text=${encodeURIComponent(`أريد طلب: ${item.name}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors">
                    اطلب الآن
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">لماذا تختارنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(c.features || []).map((f, i) => (
              <div key={i} className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Hours */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">من نحن</h2>
          <p className="text-gray-600 text-lg leading-relaxed text-center mb-12">{c.about}</p>

          {c.workingHours && c.workingHours.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-center mb-6 text-primary">ساعات العمل</h3>
              <div className="space-y-3">
                {c.workingHours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="font-semibold">{h.days}</span>
                    <span className="text-gray-500" dir="ltr">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">آراء عملائنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(c.testimonials || []).map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-gray-600 italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-primary">{t.name}</p>
                  <p className="text-gray-400 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {(c.faq || []).map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-right px-6 py-4 font-semibold text-gray-800 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span>{item.question}</span>
                  <span className={`text-primary transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-gray-500">{item.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 text-white text-center"
        style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))` }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">تواصل معنا</h2>
          <p className="text-lg opacity-90 mb-4">{c.location}</p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {c.contactEmail && <span className="text-lg">{c.contactEmail}</span>}
            {c.contactPhone && <span className="text-lg" dir="ltr">{c.contactPhone}</span>}
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-green-600 transition-colors shadow-lg">
            اطلب عبر واتساب
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} {c.businessName}. جميع الحقوق محفوظة.</p>
      </footer>

      {/* WhatsApp Float */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
