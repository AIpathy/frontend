import React from "react";
import logo from "../assets/logo.png";
import { Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="z-10 w-full flex items-center justify-between px-8 py-4">
      <img
        src={logo}
        alt="AIpathy Logo"
        className="h-16 w-auto ml-0 mt-2 pl-1 drop-shadow-sm"
      />

      <div className="flex gap-4 sm:gap-8 lg:gap-10 items-center">
        {/* Anasayfa butonu */}
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full bg-[#d4d4d4] hover:bg-[#bcbcbc] text-zinc-700 transition-colors"
        >
          <Home className="w-6 h-6" />
        </button>

        {/* Giriş / Kayıt tek ikonlu buton */}
        <button
          onClick={() => navigate("/auth")}
          className="p-2 rounded-full bg-[#d4d4d4] hover:bg-[#bcbcbc] text-zinc-700 transition-colors"
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

export default Header;
