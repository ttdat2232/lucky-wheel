import {
  History,
  ImagePlus,
  Palette,
  Trash2,
  Users,
  X,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { NameItem } from "../types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
  setInputText: (text: string) => void;
  nameItems: NameItem[];
  history: string[];
  clearHistory: () => void;
  memes: string[];
  addMeme: (url: string) => void;
  removeMeme: (index: number) => void;
  winnerMemes: string[];
  addWinnerMeme: (url: string) => void;
  removeWinnerMeme: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  inputText,
  setInputText,
  nameItems,
  history,
  clearHistory,
  memes,
  addMeme,
  removeMeme,
  winnerMemes,
  addWinnerMeme,
  removeWinnerMeme,
}) => {
  const [memeInput, setMemeInput] = useState("");
  const [winnerMemeInput, setWinnerMemeInput] = useState("");

  return (
    <aside
      className={`${isOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col`}
    >
      <div className="p-6 border-b flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Users className="text-indigo-600" size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Danh sách tên</h1>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-1 text-slate-500 hover:bg-slate-100 rounded"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Palette size={16} className="text-indigo-500" />
            Nhập tên (mỗi dòng 1 tên)
            <span className="text-xs font-normal text-slate-400">
              ({nameItems.length})
            </span>
          </label>
          <textarea
            className="w-full h-64 p-4 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none font-medium text-slate-700 leading-relaxed"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ví dụ:&#10;Nguyễn Văn A&#10;Trần Thị B..."
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setInputText("")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-all"
          >
            <Trash2 size={18} /> Xóa tất cả
          </button>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <History size={16} /> Lịch sử quay
              </h3>
              <button
                onClick={clearHistory}
                className="text-xs text-red-500 hover:underline"
              >
                Xóa
              </button>
            </div>
            <ul className="space-y-2">
              {history.map((h, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg text-sm font-medium text-slate-600"
                >
                  <span className="w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-[10px]">
                    {history.length - i}
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Meme Manager */}
        <div className="pt-6 border-t space-y-3">
          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
            <ImagePlus size={16} className="text-indigo-500" />
            Meme (tự đổi mỗi vài giây)
            <span className="text-xs font-normal text-slate-400">
              ({memes.length})
            </span>
          </label>

          <div className="flex items-center gap-2 w-full">
            <input
              value={memeInput}
              onChange={(e) => setMemeInput(e.target.value)}
              placeholder="Dán link meme..."
              className="min-w-0 flex-1 px-3 py-2 border rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              onClick={() => {
                if (!memeInput.trim()) return;
                addMeme(memeInput.trim());
                setMemeInput("");
              }}
              className="shrink-0 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Thêm
            </button>
          </div>

          {/* Meme list */}
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {memes.map((meme, index) => (
              <li
                key={index}
                className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs"
              >
                <img
                  src={meme}
                  alt="meme"
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="flex-1 truncate text-slate-600">{meme}</span>
                <button
                  onClick={() => removeMeme(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XCircle size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Winner Meme Manager */}
        <div className="pt-6 border-t space-y-3">
          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
            <ImagePlus size={16} className="text-indigo-500" />
            Meme khi quay trúng
            <span className="text-xs font-normal text-slate-400">
              ({winnerMemes.length})
            </span>
          </label>

          <div className="flex items-center gap-2 w-full">
            <input
              value={winnerMemeInput}
              onChange={(e) => setWinnerMemeInput(e.target.value)}
              placeholder="Dán link meme..."
              className="min-w-0 flex-1 px-3 py-2 border rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              onClick={() => {
                if (!winnerMemeInput.trim()) return;
                addWinnerMeme(winnerMemeInput.trim());
                setWinnerMemeInput("");
              }}
              className="shrink-0 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Thêm
            </button>
          </div>

          {/* Meme list */}
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {winnerMemes.map((meme, index) => (
              <li
                key={index}
                className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs"
              >
                <img
                  src={meme}
                  alt="meme"
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="flex-1 truncate text-slate-600">{meme}</span>
                <button
                  onClick={() => removeMeme(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XCircle size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
