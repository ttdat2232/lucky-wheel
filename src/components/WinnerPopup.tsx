import React from "react";
import { Trophy, X, PartyPopper } from "lucide-react";

interface WinnerPopupProps {
  show: boolean;
  onClose: () => void;
  winner: string | null;
  memeUrl: string;
}

const WinnerPopup: React.FC<WinnerPopupProps> = ({
  show,
  onClose,
  winner,
  memeUrl,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-scale-up border-4 border-indigo-100">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
            <Trophy size={40} className="text-yellow-300 drop-shadow-md" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-100 mb-1">
            NGƯỜI MAY MẮN
          </h3>
          <h2 className="text-4xl font-black drop-shadow-lg leading-tight">
            {winner}
          </h2>
        </div>

        <div className="p-6 text-center">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden mb-6">
            <img
              src={memeUrl}
              alt="Meme chúc mừng"
              className="w-full h-48 object-contain bg-slate-200"
            />
          </div>

          <button
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
          >
            Quá tuyệt vời!
            <PartyPopper
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerPopup;
