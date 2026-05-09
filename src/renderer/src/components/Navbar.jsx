import React, { useState, useEffect } from 'react';
import { Search, Cpu, Wifi } from 'lucide-react';
import useOSStore from '../store/useOSStore';

const Navbar = () => {
  const [time, setTime] = useState(new Date());
  const toggleSearch = useOSStore((state) => state.toggleSearch);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="h-12 w-full bg-[#0f0f0f] border-b border-white/5 flex items-center justify-between px-4 select-none">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#ff6b00] rounded-md flex items-center justify-center">
          <span className="font-bold text-[10px] text-black">B</span>
        </div>
        <span className="font-semibold text-sm tracking-widest text-gray-200">BORNEO<span className="text-[#ff6b00]">OS</span></span>
      </div>

      <div 
        onClick={toggleSearch}
        className="bg-white/5 hover:bg-white/10 transition-all cursor-pointer rounded-full px-4 py-1 flex items-center gap-3 border border-white/5 w-1/3"
      >
        <Search size={14} className="text-gray-400" />
        <span className="text-xs text-gray-500">Run actions or search... (Ctrl+K)</span>
      </div>

      <div className="flex items-center gap-4 text-gray-400">
        <div className="flex gap-2 items-center border-r border-white/10 pr-4">
          <Cpu size={14} />
          <Wifi size={14} />
        </div>
        <span className="text-xs font-medium text-gray-200 w-16">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;