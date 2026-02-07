import MemeManager from "@/components/meme/MemeManager";
import { NameItem } from "@/types/nameItem";
import { History, Palette, Trash2, Users, X } from "lucide-react";
import React from "react";

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
  return (
    <aside
      className={`${isOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-2xl transition-transform md:relative md:translate-x-0 flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Users size={20} className="text-indigo-600" />
          </div>
          <h1 className="text-xl font-bold">Danh sách tên</h1>
        </div>
        <button onClick={onClose} className="md:hidden">
          <X />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Name input */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-2 mb-2">
            <Palette size={16} />
            Nhập tên ({nameItems.length})
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-64 p-4 border rounded-xl bg-slate-50 resize-none"
            placeholder="Ví dụ:&#10;Nguyễn Văn A&#10;Trần Thị B..."
          />
        </div>

        <button
          onClick={() => setInputText("")}
          className="w-full flex justify-center gap-2 p-3 border rounded-xl"
        >
          <Trash2 size={18} /> Xóa tất cả
        </button>

        {/* History */}
        {history.length > 0 && (
          <div className="pt-6 border-t">
            <div className="flex justify-between mb-2">
              <span className="font-semibold flex items-center gap-2">
                <History size={16} /> Lịch sử quay
              </span>
              <button onClick={clearHistory} className="text-red-500 text-xs">
                Xóa
              </button>
            </div>
            <ul className="space-y-2">
              {history.map((h, i) => (
                <li key={i} className="p-2 bg-slate-50 rounded text-sm">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <MemeManager
          title="Meme (tự đổi)"
          memes={memes}
          onAdd={addMeme}
          onRemove={removeMeme}
        />

        <MemeManager
          title="Meme khi trúng"
          memes={winnerMemes}
          onAdd={addWinnerMeme}
          onRemove={removeWinnerMeme}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
