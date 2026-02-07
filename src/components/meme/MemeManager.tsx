import { ImagePlus, XCircle } from "lucide-react";
import React, { useState } from "react";

interface MemeManagerProps {
  title: string;
  memes: string[];
  onAdd: (url: string) => void;
  onRemove: (index: number) => void;
}

const MemeManager: React.FC<MemeManagerProps> = ({
  title,
  memes,
  onAdd,
  onRemove,
}) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  return (
    <div className="pt-6 border-t space-y-3">
      <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
        <ImagePlus size={16} className="text-indigo-500" />
        {title}
        <span className="text-xs font-normal text-slate-400">
          ({memes.length})
        </span>
      </label>

      <div className="flex items-center gap-2 w-full">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Dán link meme..."
          className="min-w-0 flex-1 px-3 py-2 border rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          onClick={handleAdd}
          className="shrink-0 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Thêm
        </button>
      </div>

      <ul className="space-y-2 max-h-40 overflow-y-auto">
        {memes.map((meme, index) => (
          <li
            key={index}
            className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs"
          >
            <img src={meme} className="w-10 h-10 object-cover rounded" />
            <span className="flex-1 truncate text-slate-600">{meme}</span>
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <XCircle size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemeManager;
