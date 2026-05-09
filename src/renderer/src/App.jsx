import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import useOSStore from './store/useOSStore';

// Dummy Pages (Nanti dipisah ke folder features)
const Dashboard = () => <div className="p-4"><h1>Welcome to BorneoOS</h1><p className="text-gray-400">System is running optimal.</p></div>;
const WhatsApp = () => <div className="p-4"><h1>WhatsApp Integration</h1><p className="text-gray-400">Waiting for connection...</p></div>;
const BorneoCode = () => <div className="p-4"><h1>Borneo Code IDE</h1><p className="text-gray-400">Open a folder to start coding.</p></div>;

const App = () => {
  const { activeTab } = useOSStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'whatsapp': return <WhatsApp />;
      case 'ide': return <BorneoCode />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0a0a0a] text-white font-sans">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 relative overflow-auto bg-[#141414] rounded-tl-3xl border-t border-l border-white/5">
          {/* Efek Glow di pojok kiri atas main content */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff6b00] opacity-[0.03] blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;