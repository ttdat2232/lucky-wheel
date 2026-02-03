import React, { useMemo } from "react";
import { MEME_IMAGES } from "../App";

const Header: React.FC = () => {
  const randomMeme = useMemo(() => {
    return MEME_IMAGES[Math.floor(Math.random() * MEME_IMAGES.length)];
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative group">
        <img
          src={randomMeme}
          alt="Lucky Wheel Meme"
          className="w-full h-48 object-contain rounded-2xl shadow-md border-4 border-indigo-100 group-hover:border-indigo-300 transition-all"
        />
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
          Vòng Quay May Mắn
        </div>
      </div>
    </div>
  );
};

export default Header;
