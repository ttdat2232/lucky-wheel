import { History, Palette, Trash2, Users, X } from "lucide-react";
import React from "react";
import { NameItem } from "../types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
  setInputText: (text: string) => void;
  nameItems: NameItem[];
  history: string[];
  clearHistory: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  inputText,
  setInputText,
  nameItems,
  history,
  clearHistory,
}) => {
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

        {/* Color Preview */}
        {/* <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Màu sắc vòng quay
          </h3>
          <div className="flex flex-wrap gap-2">
            {nameItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-100 rounded-full shadow-sm text-xs font-medium text-slate-600"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.text}
              </div>
            ))}
          </div>
        </div> */}

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
      </div>
    </aside>
  );
};

export default Sidebar;
