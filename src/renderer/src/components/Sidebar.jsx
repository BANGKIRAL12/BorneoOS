import React from 'react';
import * as Icons from 'lucide-react';
import useOSStore from '../store/useOSStore';
import { osConfig } from '../config/osConfig';

const SidebarItem = ({ iconName, id, label, isExpanded }) => {
  const { activeTab, setActiveTab } = useOSStore();
  const isActive = activeTab === id;
  
  // Membuka komponen Icon secara dinamis berdasarkan string konfigurasi
  const Icon = Icons[iconName] || Icons.HelpCircle;

  return (
    <div 
      onClick={() => setActiveTab(id)}
      className={`group relative flex items-center cursor-pointer transition-all duration-200 rounded-xl h-11 mb-2 px-3 mx-2
        ${isExpanded ? 'justify-start gap-3 w-auto' : 'justify-center w-11'}
        ${isActive ? 'bg-[#ff6b00] text-black shadow-[0_0_15px_rgba(255,107,0,0.3)] font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    >
      <Icon size={18} className="shrink-0" />
      
      {isExpanded ? (
        <span className="text-xs truncate transition-opacity duration-300">{label}</span>
      ) : (
        /* Tooltip hanya muncul melayang saat sidebar dalam kondisi menciut (Collapsed) */
        <div className="absolute left-14 bg-black border border-white/10 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const isSidebarExpanded = useOSStore((state) => state.isSidebarExpanded);

  return (
    <aside 
      className={`bg-[#0f0f0f] flex flex-col py-4 border-r border-white/5 transition-all duration-300 ease-in-out select-none h-full overflow-hidden shrink-0
        ${isSidebarExpanded ? 'w-[220px]' : 'w-16'}`}
    >
      {/* Menu Utama Dinamis dari File Config */}
      <div className="flex-1">
        {osConfig.sidebarMenu.map((item) => (
          <SidebarItem 
            key={item.id} 
            iconName={item.icon} 
            id={item.id} 
            label={item.label} 
            isExpanded={isSidebarExpanded} 
          />
        ))}
      </div>
      
      {/* Menu Settings Bottom */}
      <div className="border-t border-white/5 pt-2">
        <SidebarItem 
          iconName="Settings" 
          id="settings" 
          label="Settings" 
          isExpanded={isSidebarExpanded} 
        />
      </div>
    </aside>
  );
};

export default Sidebar;