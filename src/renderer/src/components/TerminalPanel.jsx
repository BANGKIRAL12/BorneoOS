import React from 'react';
import { Terminal, X, Minimize2 } from 'lucide-react';
import useOSStore from '../store/useOSStore';

const TerminalPanel = () => {
  const { isTerminalOpen, toggleTerminal } = useOSStore();

  if (!isTerminalOpen) return null;

  return (
    <div className="h-64 w-full bg-[#0b0b0b] border-t border-white/5 flex flex-col animate-in slide-in-from-bottom duration-200">
      {/* Terminal Header */}
      <div className="h-9 bg-[#111] border-b border-white/5 flex items-center justify-between px-4 select-none">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Terminal size={12} className="text-[#ff6b00]" />
          <span>borneoos-sh (bash)</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <button className="hover:text-white transition-colors"><Minimize2 size={12} /></button>
          <button onClick={toggleTerminal} className="hover:text-white transition-colors"><X size={12} /></button>
        </div>
      </div>

      {/* Terminal Body Placeholder */}
      <div className="flex-1 p-4 font-mono text-xs text-green-400 overflow-auto selection:bg-[#ff6b00]/30">
        <p className="text-gray-500">[System] BorneoOS Terminal Engine Initialized.</p>
        <p className="text-gray-500">[System] Awaiting local node-pty bridge...</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#ff6b00]">borneo@desktop:~$</span>
          <span className="w-2 h-4 bg-white animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

export default TerminalPanel;