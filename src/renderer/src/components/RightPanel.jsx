import React from 'react';
import { Bot, Globe, MessageSquare, Calculator, Bell, X } from 'lucide-react';
import useOSStore from '../store/useOSStore';

const RightPanel = () => {
  const { isRightPanelOpen, rightPanelTab, toggleRightPanel } = useOSStore();

  if (!isRightPanelOpen) return null;

  // Render konten kosongan dinamis berdasarkan tab aktif
  const renderPanelContent = () => {
    switch (rightPanelTab) {
      case 'ai':
        return <div className="p-4 text-center text-gray-400 font-mono text-xs">🤖 BorneoAI Chat Container</div>;
      case 'browser':
        return <div className="p-4 text-center text-gray-400 font-mono text-xs">🌐 Mini Browser View</div>;
      case 'whatsapp':
        return <div className="p-4 text-center text-gray-400 font-mono text-xs">💬 WhatsApp Quick Panel</div>;
      case 'calc':
        return <div className="p-4 text-center text-gray-400 font-mono text-xs">🧮 Calculator & Converter</div>;
      case 'notifications':
        return <div className="p-4 text-center text-gray-400 font-mono text-xs">🔔 Notifications & Agenda</div>;
      default:
        return null;
    }
  };

  const tabsInfo = {
    ai: { label: 'BorneoAI', icon: Bot },
    browser: { label: 'Mini Browser', icon: Globe },
    whatsapp: { label: 'WhatsApp Messenger', icon: MessageSquare },
    calc: { label: 'Calculator', icon: Calculator },
    notifications: { label: 'System Agenda', icon: Bell },
  };

  const CurrentIcon = tabsInfo[rightPanelTab]?.icon || Bot;

  return (
    <aside className="w-80 bg-[#0f0f0f] border-l border-white/5 flex flex-col h-full animate-in slide-in-from-right duration-200 z-40">
      {/* Panel Header */}
      <div className="h-11 border-b border-white/5 flex items-center justify-between px-4 select-none">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-300">
          <CurrentIcon size={14} className="text-[#ff6b00]" />
          <span>{tabsInfo[rightPanelTab]?.label}</span>
        </div>
        <button onClick={toggleRightPanel} className="text-gray-500 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>

      {/* Panel Body */}
      <div className="flex-1 overflow-y-auto bg-[#141414]">
        {renderPanelContent()}
      </div>
    </aside>
  );
};

export default RightPanel;