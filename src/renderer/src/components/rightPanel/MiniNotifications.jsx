import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const MiniNotifications = () => {
  const mockNotifs = [
    { id: 1, type: 'success', title: 'System Synchronized', desc: 'Database SQLite finance berhasil dicadangkan.', time: '5m ago' },
    { id: 2, type: 'info', title: 'Ollama Engine', desc: 'Model qwen2.5-coder siap digunakan di port 11434.', time: '20m ago' },
    { id: 3, type: 'warning', title: 'Git Repository Update', desc: 'Ada 3 commits yang belum Anda push ke remote.', time: '1h ago' }
  ];

  return (
    <div className="p-4 space-y-3 overflow-y-auto h-full bg-[#0b0b0b] scrollbar-none">
      <div className="flex justify-between items-center mb-2 select-none">
        <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Active Alert Stream</span>
        <span className="text-[9px] font-mono hover:text-[#ff6b00] cursor-pointer bg-white/5 px-1.5 py-0.5 rounded text-gray-400 transition-colors">Clear All</span>
      </div>
      {mockNotifs.map((n) => (
        <div key={n.id} className="bg-[#111] border border-white/5 rounded-xl p-3 flex gap-3 hover:border-white/10 transition-colors">
          {n.type === 'success' ? (
            <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={14} className="text-[#ff6b00] shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <div className="flex justify-between items-center w-full gap-4">
              <h4 className="text-xs font-semibold text-white truncate">{n.title}</h4>
              <span className="text-[9px] font-mono text-gray-600 shrink-0">{n.time}</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-normal">{n.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniNotifications;