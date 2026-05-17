import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import TerminalPanel from './components/TerminalPanel';
import Dashboard from './features/dashboard/Dashboard';
import Assistant from './features/assistant/Assistant';
import useOSStore from './store/useOSStore';
import { osConfig } from './config/osConfig';

const WhatsAppPage = () => <div className="p-6"><h1>WhatsApp Full Window View</h1></div>;
const BorneoCode = () => <div className="p-6"><h1>Borneo Code Core IDE</h1></div>;

const App = () => {
  const { 
    activeTab, 
    toggleSidebarExpand, 
    toggleTerminal, 
    toggleSearch, 
    setRightPanelTab 
  } = useOSStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { shortcuts } = osConfig;

      // Helper untuk memvalidasi event keyboard dengan data osConfig
      const matchShortcut = (configItem) => 
        e.key.toLowerCase() === configItem.key.toLowerCase() &&
        (e.ctrlKey || e.metaKey) === !!configItem.ctrl &&
        e.altKey === !!configItem.alt;

      // Ctrl + B: Toggle Ukuran Lebar Sidebar
      if (matchShortcut(shortcuts.toggleSidebar)) {
        e.preventDefault();
        toggleSidebarExpand();
      }
      
      // Ctrl + ` : Toggle Terminal Bawah
      if (matchShortcut(shortcuts.toggleTerminal)) {
        e.preventDefault();
        toggleTerminal();
      }

      // Ctrl + K : Toggle Search Palette
      if (matchShortcut(shortcuts.toggleSearch)) {
        e.preventDefault();
        toggleSearch();
      }

      // Alt Shortcuts untuk Panel Samping Kanan
      // Jalur Pintasan Keyboard Navigasi Panel Kanan BorneoOS
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        useOSStore.getState().setRightPanelTab('ai');
      }
      if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        useOSStore.getState().setRightPanelTab('calc');
      }
      if (e.altKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        useOSStore.getState().setRightPanelTab('notifications');
      }
      // ─── PENYUNTIKAN SHORTCUT KALENDER & WAKTU RESMI ───
      if (e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        useOSStore.getState().setRightPanelTab('calc_time'); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebarExpand, toggleTerminal, toggleSearch, setRightPanelTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'assistant': return <Assistant />;
      case 'whatsapp': return <WhatsAppPage />;
      case 'ide': return <BorneoCode />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0a0a0a] text-white font-sans antialiased select-none">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden w-full relative">
        {/* Sidebar tidak di-unmount, melainkan diatur lebarnya di dalam komponen */}
        <Sidebar />
        
        {/* Main Center Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#141414] border-t border-l border-white/5 rounded-tl-2xl">
          <div className="flex-1 relative overflow-auto">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff6b00] opacity-[0.02] blur-[100px] pointer-events-none"></div>
            {renderContent()}
          </div>
          <TerminalPanel />
        </div>

        <RightPanel />
      </div>
    </div>
  );
};

export default App;