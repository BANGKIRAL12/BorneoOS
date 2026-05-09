import React from 'react';
import { LayoutDashboard, MessageSquare, Code2, Wallet, Settings } from 'lucide-react';
import useOSStore from '../store/useOSStore';

const SidebarItem = ({ icon: Icon, id, label }) => {
  const { activeTab, setActiveTab } = useOSStore();
  const isActive = activeTab === id;

  return (
    <div 
      onClick={() => setActiveTab(id)}
      className={`group relative flex items-center justify-center w-12 h-12 mb-4 cursor-pointer transition-all duration-300 rounded-xl
        ${isActive ? 'bg-[#ff6b00] text-black shadow-[0_0_15px_rgba(255,107,0,0.4)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
    >
      <Icon size={20} />
      {/* Tooltip */}
      <div className="absolute left-14 bg-black border border-white/10 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
        {label}
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-20 bg-[#0f0f0f] flex flex-col items-center py-6 border-r border-white/5">
      <SidebarItem icon={LayoutDashboard} id="dashboard" label="Dashboard" />
      <SidebarItem icon={MessageSquare} id="whatsapp" label="WhatsApp" />
      <SidebarItem icon={Code2} id="ide" label="Borneo Code" />
      <SidebarItem icon={Wallet} id="finance" label="Finance" />
      
      <div className="mt-auto">
        <SidebarItem icon={Settings} id="settings" label="Settings" />
      </div>
    </aside>
  );
};

export default Sidebar;