import React from 'react';
import { Bot, Calculator, Bell, Calendar as CalIcon, X, Sparkles } from 'lucide-react';
import useOSStore from '../store/useOSStore';

// Impor komponen tools dari file terpisah
import MiniAIChat from './rightPanel/MiniAIChat';
import MiniCalculator from './rightPanel/MiniCalculator';
import MiniNotifications from './rightPanel/MiniNotifications';
import MiniCalendarClock from './rightPanel/MiniCalendarClock';

const RightPanel = () => {
  const { isRightPanelOpen, rightPanelTab, toggleRightPanel } = useOSStore();

  if (!isRightPanelOpen) return null;

  // Konfigurasi Header dinamis berdasarkan tab aktif
  const getHeaderMeta = () => {
    switch (rightPanelTab) {
      case 'ai': return { title: 'BorneoAI Copilot', icon: <Bot size={14} /> };
      case 'calc': return { title: 'Flash Calculator', icon: <Calculator size={14} /> };
      case 'notifications': return { title: 'Notification Hub', icon: <Bell size={14} /> };
      case 'calc_time': return { title: 'Time & Calendar', icon: <CalIcon size={14} /> };
      default: return { title: 'Utility Blade', icon: <Sparkles size={14} /> };
    }
  };

  const meta = getHeaderMeta();

  return (
    <aside className="w-[310px] bg-[#0f0f0f] border-l border-white/5 flex flex-col h-full overflow-hidden relative shadow-2xl animate-in slide-in-from-right duration-200 shrink-0">
      {/* Header Panel */}
      <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#111] text-white select-none shrink-0">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wide text-gray-200">
          <div className="text-[#ff6b00]">{meta.icon}</div>
          <span>{meta.title.toUpperCase()}</span>
        </div>
        <button 
          onClick={toggleRightPanel}
          className="text-gray-500 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Konten Dinamis Modular */}
      <div className="flex-1 overflow-hidden bg-[#0a0a0a]">
        {rightPanelTab === 'ai' && <MiniAIChat />}
        {rightPanelTab === 'calc' && <MiniCalculator />}
        {rightPanelTab === 'notifications' && <MiniNotifications />}
        {rightPanelTab === 'calc_time' && <MiniCalendarClock />}
      </div>
    </aside>
  );
};

export default RightPanel;