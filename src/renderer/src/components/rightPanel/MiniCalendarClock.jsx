import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const MiniCalendarClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const today = time.getDate();
  const year = time.getFullYear();
  const month = time.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const dayGrid = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="p-4 space-y-4 flex flex-col h-full bg-[#0b0b0b] select-none">
      {/* Real-time Clock */}
      <div className="bg-gradient-to-br from-[#111] to-black border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-md">
        <div className="absolute top-0 left-0 w-16 h-16 bg-[#ff6b00]/5 blur-xl rounded-full"></div>
        <Clock size={16} className="text-[#ff6b00] mb-2 animate-pulse" />
        <span className="font-mono text-2xl font-bold tracking-tight text-white">
          {time.toLocaleTimeString('id-ID', { hour12: false })}
        </span>
        <span className="text-[10px] font-mono text-gray-500 mt-1 uppercase tracking-widest">
          {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}
        </span>
      </div>

      {/* Mini Calendar Matrix */}
      <div className="border border-white/5 bg-[#111] rounded-xl p-3 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-mono font-bold text-gray-600 uppercase mb-2">
          {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((d, i) => <div key={i}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
          {dayGrid.map((day, idx) => (
            <div 
              key={idx} 
              className={`h-6 flex items-center justify-center rounded-md
                ${day ? 'text-gray-400' : 'text-transparent'}
                ${day === today ? 'bg-[#ff6b00] !text-black font-bold shadow-[0_0_10px_rgba(255,107,0,0.3)]' : ''}
              `}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniCalendarClock;