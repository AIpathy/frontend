import React from "react";
import { Home, User, BookOpen, HelpCircle, Info, Brain, PenLine, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="z-10 w-full flex items-center justify-between px-8 py-6 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-slate-100/50">

      {/* Logo */}
      <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => navigate("/")}>
        <div className="relative transform hover:scale-105 transition-all duration-300">
          <svg
            width="200"
            height="150"
            viewBox="0 0 200 150"
            className="w-48 h-36 drop-shadow-lg"
          >
            <g transform="translate(20, 20)">
              <path
                d="M20,30 C20,25 25,20 30,20 C35,20 40,25 40,30 C40,35 30,45 20,50 C10,45 0,35 0,30 C0,25 5,20 10,20 C15,20 20,25 20,30 Z"
                fill="#2D5A57"
                className="group-hover:fill-emerald-600 transition-colors duration-300"
              />
              <path
                d="M50,35 L80,35 L85,25 L90,45 L95,15 L100,35 L130,35"
                stroke="#2D5A57"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-emerald-600 transition-colors duration-300"
              />
            </g>
            <text
              x="20"
              y="120"
              fontSize="48"
              fontWeight="bold"
              className="select-none"
            >
              <tspan fill="#2D5A57" className="group-hover:fill-emerald-600 transition-colors duration-300">AI</tspan>
              <tspan fill="#1F2937">pathy</tspan>
            </text>
          </svg>

          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        </div>
      </div>

      {/* Navigasyon Butonları */}
      <div className="flex gap-6 sm:gap-8 lg:gap-10 items-center">

        {/* Ana Sayfa */}
        <button
          onClick={() => navigate("/")}
          className="group relative p-4 rounded-full bg-gradient-to-br from-slate-200/80 to-slate-300/60 hover:from-slate-100 hover:to-slate-200/80 text-zinc-700 hover:text-emerald-600 transition-all duration-300 shadow-lg shadow-slate-300/40 hover:shadow-xl hover:shadow-emerald-200/50 transform hover:scale-110 hover:-translate-y-1 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/20 group-hover:to-teal-500/10 transition-all duration-300"></div>
          <Home className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Ana Sayfa
          </div>
        </button>

        {/* Hastalıklar */}
        <button
          onClick={() => navigate("/hastaliklar")}
          className="group relative p-4 rounded-full bg-gradient-to-br from-slate-200/80 to-slate-300/60 hover:from-slate-100 hover:to-slate-200/80 text-zinc-700 hover:text-blue-600 transition-all duration-300 shadow-lg shadow-slate-300/40 hover:shadow-xl hover:shadow-blue-200/50 transform hover:scale-110 hover:-translate-y-1 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:to-indigo-500/10 transition-all duration-300"></div>
          <BookOpen className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Hastalıklar
          </div>
        </button>

        {/* Hakkımızda */}
        <button
          onClick={() => navigate("/hakkimizda")}
          className="group relative p-4 rounded-full bg-gradient-to-br from-slate-200/80 to-slate-300/60 hover:from-slate-100 hover:to-slate-200/80 text-zinc-700 hover:text-orange-600 transition-all duration-300 shadow-lg shadow-slate-300/40 hover:shadow-xl hover:shadow-orange-200/50 transform hover:scale-110 hover:-translate-y-1 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/0 to-yellow-500/0 group-hover:from-orange-500/20 group-hover:to-yellow-500/10 transition-all duration-300"></div>
          <Info className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Hakkımızda
          </div>
        </button>

        {/* Nasıl Çalışır */}
        <button
          onClick={() => navigate("/nasil-calisir")}
          className="group relative p-4 rounded-full bg-gradient-to-br from-slate-200/80 to-slate-300/60 hover:from-slate-100 hover:to-slate-200/80 text-zinc-700 hover:text-teal-600 transition-all duration-300 shadow-lg shadow-slate-300/40 hover:shadow-xl hover:shadow-teal-200/50 transform hover:scale-110 hover:-translate-y-1 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500/0 to-emerald-500/0 group-hover:from-teal-500/20 group-hover:to-emerald-500/10 transition-all duration-300"></div>
          <Brain className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Nasıl Çalışır
          </div>
        </button>

        {/* SSS */}
        <button
          onClick={() => navigate("/sss")}
          className="group relative p-4 rounded-full bg-gradient-to-br from-slate-200/80 to-slate-300/60 hover:from-slate-100 hover:to-slate-200/80 text-zinc-700 hover:text-purple-600 transition-all duration-300 shadow-lg shadow-slate-300/40 hover:shadow-xl hover:shadow-purple-200/50 transform hover:scale-110 hover:-translate-y-1 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/10 transition-all duration-300"></div>
          <HelpCircle className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            SSS
          </div>
        </button>

        {/* Psikolojik Testler */}
        <button
          onClick={() => navigate("/psikolojik-testler")}
          className="group relative p-4 rounded-full bg-gradient-to-br from-emerald-200/80 to-teal-300/60 hover:from-green-100 hover:to-green-200/80 text-green-900 hover:text-emerald-700 transition-all duration-300 shadow-lg shadow-green-200/40 hover:shadow-xl hover:shadow-emerald-200/50 transform hover:scale-110 hover:-translate-y-1 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/20 group-hover:to-green-500/10 transition-all duration-300"></div>
          <ClipboardList className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Psikolojik Testler
          </div>
        </button>

        {/* Blog */}
        <button
          onClick={() => navigate("/blog")}
          className="group relative p-4 rounded-full bg-gradient-to-br from-slate-200/80 to-slate-300/60 hover:from-slate-100 hover:to-slate-200/80 text-zinc-700 hover:text-pink-600 transition-all duration-300 shadow-lg shadow-slate-300/40 hover:shadow-xl hover:shadow-pink-200/50 transform hover:scale-110 hover:-translate-y-1 active:scale-95"
        >
          <PenLine className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Blog
          </div>
        </button>

        {/* Giriş Yap */}
        <button
          onClick={() => navigate("/auth")}
          className="group relative p-4 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 text-white transition-all duration-300 shadow-xl shadow-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/60 transform hover:scale-110 hover:-translate-y-1 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <User className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Giriş Yap
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;