import React, { useEffect, useRef } from 'react';
import { Terminal, Plus, X } from 'lucide-react';
import { Terminal as Xterm } from 'xterm';
import 'xterm/css/xterm.css';
import useOSStore from '../store/useOSStore';
import useTerminalStore from '../store/useTerminalStore';

// Sub-Komponen untuk menampung masing-masing instance xterm secara independen
const TerminalInstance = ({ id, isActive }) => {
  const containerRef = useRef(null);
  const xtermRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Inisialisasi Xterm UI
    const term = new Xterm({
      cursorBlink: true,
      fontSize: 12,
      fontFamily: 'Courier New, monospace',
      theme: {
        background: '#0b0b0b',
        foreground: '#f8f8f2',
      },
    });

    term.open(containerRef.current);
    xtermRef.current = term;

    // INTEGRASI REAL ELECTRON vs CODESPACE BROWSER FALLBACK
    if (window.api) {
      window.api.createTerminal(id);
      
      term.onData((data) => window.api.writeTerminal(id, data));
      const unsubscribe = window.api.onTerminalData(id, (data) => term.write(data));

      return () => {
        unsubscribe();
        term.dispose();
      };
    } else {
      // Browser Mock Mode (Jika dibuka di Browser Codespace biasa)
      term.writeln('\x1b[33m[BorneoOS Browser Preview Mode]\x1b[0m');
      term.write('\r\nborneo@desktop:~$ ');
      
      let inputBuffer = '';
      term.onData((data) => {
        const code = data.charCodeAt(0);
        if (code === 13) { // Enter
          term.writeln('');
          if (inputBuffer.trim() === 'clear') {
            term.clear();
          } else if (inputBuffer.trim() !== '') {
            term.writeln(`sh: command not found: ${inputBuffer}`);
          }
          term.write('borneo@desktop:~$ ');
          inputBuffer = '';
        } else if (code === 127) { // Backspace
          if (inputBuffer.length > 0) {
            term.write('\b \b');
            inputBuffer = inputBuffer.slice(0, -1);
          }
        } else {
          term.write(data);
          inputBuffer += data;
        }
      });

      return () => term.dispose();
    }
  }, [id]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full p-2 ${isActive ? 'block' : 'hidden'}`} 
    />
  );
};

const TerminalPanel = () => {
  const isTerminalOpen = useOSStore((state) => state.isTerminalOpen);
  const { toggleTerminal } = useOSStore();
  const { height, setHeight, terminals, activeTerminalId, addTerminal, closeTerminal, setActiveTerminalId } = useTerminalStore();

  const resizeRef = useRef(null);

  // Fungsi mengendalikan Tarik Tinggi Jendela (Drag and Resize)
  const handleMouseDown = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = height;

    const handleMouseMove = (moveEvent) => {
      const deltaY = startY - moveEvent.clientY;
      setHeight(startHeight + deltaY);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  if (!isTerminalOpen) return null;

  return (
    <div 
      style={{ height: `${height}px` }}
      className="w-full bg-[#0b0b0b] border-t border-white/5 flex flex-col relative shrink-0"
    >
      {/* DRAG BAR: Garis tipis oranye di atas panel yang bisa ditarik */}
      <div 
        onMouseDown={handleMouseDown}
        className="absolute top-0 left-0 w-full h-1 cursor-row-resize bg-transparent hover:bg-[#ff6b00] transition-colors z-50"
      />

      {/* Terminal Tab Bar Header */}
      <div className="h-9 bg-[#111] border-b border-white/5 flex items-center justify-between px-2 select-none">
        <div className="flex items-center gap-1 overflow-x-auto h-full">
          {terminals.map((term) => {
            const isTabActive = activeTerminalId === term.id;
            return (
              <div
                key={term.id}
                onClick={() => setActiveTerminalId(term.id)}
                className={`h-full flex items-center gap-2 px-3 text-xs font-mono border-r border-white/5 cursor-pointer transition-colors
                  ${isTabActive ? 'bg-[#0b0b0b] text-[#ff6b00] border-t-2 border-t-[#ff6b00]' : 'text-gray-500 hover:text-gray-300 bg-[#161616]'}`}
              >
                <Terminal size={11} />
                <span>{term.name}</span>
                <X 
                  size={10} 
                  onClick={(e) => closeTerminal(term.id, e)}
                  className="hover:bg-white/10 rounded p-0.5 text-gray-500 hover:text-white"
                />
              </div>
            );
          })}
          
          {/* Tombol Tambah Terminal Baru */}
          <button 
            onClick={addTerminal}
            className="p-1 mx-2 text-gray-500 hover:text-white hover:bg-white/5 rounded transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>

        {/* Tombol Close Seluruh Panel */}
        <button 
          onClick={toggleTerminal} 
          className="text-gray-500 hover:text-white px-2"
        >
          <X size={12} />
        </button>
      </div>

      {/* Terminal Viewports Container */}
      <div className="flex-1 overflow-hidden relative bg-[#0b0b0b]">
        {terminals.map((term) => (
          <TerminalInstance 
            key={term.id} 
            id={term.id} 
            isActive={activeTerminalId === term.id} 
          />
        ))}
      </div>
    </div>
  );
};

export default TerminalPanel;