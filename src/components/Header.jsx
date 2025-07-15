import React from "react";
import logo from "../assets/logo.png";
import Button from "./Button";
import { Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="z-10 w-full flex items-center justify-between px-6 bg-[#1c1c1e] h-[64px]">
      <div className="flex items-center">
        <img src={logo} alt="AIpathy Logo" className="w-[100px] h-[100px]" />
      </div>
      <div className="flex gap-4 sm:gap-8 lg:gap-10 items-center">
        {/* Anasayfa butonu */}
        <Button onClick={() => navigate("/")}>
          <Home className="w-6 h-6 text-[#3CB97F]" />
        </Button>

        {/* Giriş / Kayıt tek ikonlu buton */}
        <Button onClick={() => navigate("/auth")}>
          <User className="w-6 h-6 text-[#3CB97F]" />
        </Button>
      </div>
    </header>
  );
}

export default Header;
