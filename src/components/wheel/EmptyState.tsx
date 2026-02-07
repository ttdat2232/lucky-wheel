import { Menu } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  show: boolean;
  onOpenSidebar: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-30">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border text-center space-y-4 max-w-sm">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <Menu size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Danh sách trống</h3>
        <p className="text-slate-500">
          Hãy thêm tên vào danh sách ở menu bên trái để bắt đầu!
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
