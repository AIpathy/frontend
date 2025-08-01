import React from "react";
import { Brain, Shield, Lock, Heart, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100">
     
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-100/30 via-teal-100/20 to-emerald-200/30"></div>
        <div className="absolute top-8 left-1/4 w-32 h-8 bg-emerald-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 right-1/3 w-40 h-6 bg-teal-300/20 rounded-full blur-2xl"></div>
      </div>
      
      
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(90deg, rgba(16,185,129,0.1) 0%, transparent 50%, rgba(20,184,166,0.1) 100%)`,
        backgroundSize: '100px 20px'
      }}></div>
      
     
      <div className="relative z-10 px-6 py-6 max-w-6xl mx-auto">
       
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3 group">
         
            <div className="flex items-center">
              
              <svg width="32" height="28" viewBox="0 0 32 28" fill="none" className="text-teal-700">
                <path d="M16 26c0 0-12-8-12-16C4 6 8 2 12 2c2.5 0 4 2 4 2s1.5-2 4-2c4 0 8 4 8 8 0 8-12 16-12 16z" fill="currentColor"/>
              </svg>
              
              
              <svg width="120" height="20" viewBox="0 0 120 20" fill="none" className="text-teal-700 ml-2">
                <path d="M2 10 L15 10 L20 2 L25 18 L30 6 L35 14 L40 10 L118 10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            
            <div className="text-2xl font-bold ml-4">
              <span className="text-teal-700">AI</span><span className="text-gray-800">pathy</span>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          
          
          <div className="flex flex-wrap justify-center lg:justify-between items-start gap-8 lg:gap-12">
            
            {/* Şirket bilgisi */}
            <div className="text-center lg:text-left">
              <h3 className="text-sm font-semibold text-teal-700 mb-2 flex items-center justify-center lg:justify-start gap-2">
                <Brain className="w-4 h-4" />
                Şirket
              </h3>
              <nav className="space-y-1">
                <a href="#" className="block text-slate-600 hover:text-teal-700 transition-colors duration-300 text-xs">
                  Hakkımızda
                </a>
                <a href="#" className="block text-slate-600 hover:text-teal-700 transition-colors duration-300 text-xs">
                  SSS
                </a>
                <a href="#" className="block text-slate-600 hover:text-teal-700 transition-colors duration-300 text-xs">
                  İletişim
                </a>
              </nav>
            </div>

            {/* Yasal */}
            <div className="text-center lg:text-left">
              <h3 className="text-sm font-semibold text-teal-700 mb-2 flex items-center justify-center lg:justify-start gap-2">
                <Shield className="w-4 h-4" />
                Yasal
              </h3>
              <nav className="space-y-1">
                <a href="#" className="block text-slate-600 hover:text-teal-700 transition-colors duration-300 text-xs">
                  Gizlilik Politikası
                </a>
                <a href="#" className="block text-slate-600 hover:text-teal-700 transition-colors duration-300 text-xs">
                  Kullanım Şartları
                </a>
                <a href="#" className="block text-slate-600 hover:text-teal-700 transition-colors duration-300 text-xs">
                  Çerez Politikası
                </a>
              </nav>
            </div>

            {/* İletişim Bilgileri */}
            <div className="text-center lg:text-left">
              <h3 className="text-sm font-semibold text-teal-700 mb-2 flex items-center justify-center lg:justify-start gap-2">
                <Phone className="w-4 h-4" />
                İletişim
              </h3>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-600">
                  <Mail className="w-3 h-3 text-teal-700" />
                  <span>info@aipathy.xyz</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-600">
                  <Phone className="w-3 h-3 text-teal-700" />
                  <span>+90 212 XXX XX XX</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-600">
                  <MapPin className="w-3 h-3 text-teal-700" />
                  <span>İstanbul, Türkiye</span>
                </div>
              </div>
            </div>

            {/* Sosyal Medya */}
            <div className="text-center lg:text-left">
              <h3 className="text-sm font-semibold text-teal-700 mb-2">Takip Edin</h3>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <a href="https://www.facebook.com/profile.php?id=61578951092137" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-700 transition-colors duration-300 hover:scale-110 transform">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://x.com/ai_pathy" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-700 transition-colors duration-300 hover:scale-110 transform">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/ai_pathy/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-700 transition-colors duration-300 hover:scale-110 transform">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/company/aipathy" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-700 transition-colors duration-300 hover:scale-110 transform">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="text-slate-400 hover:text-teal-700 transition-colors duration-300 hover:scale-110 transform">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Özellikler & Copyright */}
        <div className="border-t border-slate-200 pt-4 mt-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 text-center lg:text-left">
            
            {/* Özellikler */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-xs">
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded-full border border-slate-200">
                <Brain className="w-3 h-3 text-teal-700" />
                <span className="text-slate-600">AI Mental Health</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded-full border border-slate-200">
                <Shield className="w-3 h-3 text-teal-700" />
                <span className="text-slate-600">Güvenli</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded-full border border-slate-200">
                <Heart className="w-3 h-3 text-teal-700" />
                <span className="text-slate-600">7/24</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex items-center justify-center lg:justify-end gap-1 text-xs text-slate-500">
              <span>© 2025 AIpathy</span>
              <Heart className="w-3 h-3 text-teal-700 animate-pulse" />
              <span>İstanbul</span>
            </div>

          </div>
        </div>
      </div>
      
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400"></div>
    </footer>
  );
}

export default Footer;