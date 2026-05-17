import React, { useState, useEffect } from 'react';
import { Wallet, CheckCircle, Circle, Plus, Trash2, FileText, CloudSun, Calendar as CalIcon, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

// ─── 1. WIDGET KALENDER DINAMIS (UTILITY PANEL) ───
const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Menghitung jumlah hari pada bulan berjalan
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Menghitung hari pertama bulan berjalan jatuh pada hari apa (0 = Minggu, dst)
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Membuat array untuk grid kalender
  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null); // Slot kosong untuk bulan sebelumnya
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-5 hover:border-[#ff6b00]/30 transition-all flex flex-col h-full select-none">
      {/* Header Kalender */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-gray-300">
          <CalIcon size={14} className="text-[#ff6b00]" />
          <span>{months[month].toUpperCase()} {year}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={14} />
          </button>
          <button onClick={handleNextMonth} className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Nama Hari Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-gray-500 font-bold mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Angka Tanggal Grid */}
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs flex-1 content-start">
        {calendarDays.map((day, index) => {
          const isToday = 
            day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear();

          return (
            <div 
              key={index} 
              className={`h-8 flex items-center justify-center rounded-lg text-[11px] transition-all
                ${day ? 'hover:bg-white/5 cursor-pointer text-gray-300' : 'text-transparent'}
                ${isToday ? 'bg-[#ff6b00] !text-black font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)]' : ''}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── 2. WIDGET TABUNGAN UTAMA ───
const FinanceWidget = () => {
  const currentSavings = 3450000;
  const targetSavings = 5000000;
  const progress = (currentSavings / targetSavings) * 100;

  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-5 hover:border-[#ff6b00]/30 transition-all relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b00] opacity-[0.01] blur-2xl pointer-events-none"></div>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 bg-[#ff6b00]/10 rounded-xl text-[#ff6b00]">
          <Wallet size={18} />
        </div>
        <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded-full text-gray-400 flex items-center gap-1">
          <TrendingUp size={10} className="text-green-400" /> Target 69% Achieved
        </span>
      </div>
      <h3 className="text-gray-400 text-xs font-mono uppercase tracking-wider">Tabungan Utama</h3>
      <p className="text-2xl font-bold tracking-tight mt-1 text-white">
        Rp {currentSavings.toLocaleString('id-ID')}
      </p>
      
      <div className="mt-5">
        <div className="flex justify-between text-[11px] font-mono text-gray-500 mb-1.5">
          <span>Progress</span>
          <span>Rp {targetSavings.toLocaleString('id-ID')}</span>
        </div>
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
          <div 
            style={{ width: `${progress}%` }} 
            className="bg-gradient-to-r from-[#ff6b00] to-[#ff914d] h-full rounded-full shadow-[0_0_10px_rgba(255,107,0,0.5)]"
          ></div>
        </div>
      </div>
    </div>
  );
};

// ─── 3. WIDGET DAILY TO-DO LIST ───
const TodoWidget = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Selesaikan modul IPC Bridge WhatsApp', done: true },
    { id: 2, text: 'Review database SQLite untuk Finance', done: false },
    { id: 3, text: 'Setup layout xterm canvas', done: false },
  ]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-5 hover:border-[#ff6b00]/30 transition-all flex flex-col h-[260px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-wider">Daily Task Matrix</h3>
        <span className="text-[10px] font-mono bg-[#ff6b00]/10 text-[#ff6b00] px-2 py-0.5 rounded">
          {todos.filter(t => !t.done).length} Tasks Left
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {todos.map(todo => (
          <div 
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border group/item
              ${todo.done ? 'bg-white/[0.01] border-transparent text-gray-500' : 'bg-white/5 border-white/5 text-gray-200 hover:border-white/10'}`}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              {todo.done ? (
                <CheckCircle size={14} className="text-[#ff6b00] shrink-0" />
              ) : (
                <Circle size={14} className="text-gray-500 hover:text-white shrink-0" />
              )}
              <span className={`text-xs truncate ${todo.done ? 'line-through' : ''}`}>{todo.text}</span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}
              className="text-gray-600 hover:text-red-400 opacity-0 group-hover/item:opacity-100 transition-opacity p-1"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={addTodo} className="mt-3 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Inject task description..." 
          className="flex-1 bg-white/5 border border-white/5 text-xs rounded-xl px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6b00]/40 transition-colors"
        />
        <button type="submit" className="bg-[#ff6b00] text-black p-2 rounded-xl hover:bg-[#ff8533] transition-colors shrink-0">
          <Plus size={14} />
        </button>
      </form>
    </div>
  );
};

// ─── 4. WIDGET QUICK SCRATCHPAD ───
const NotesWidget = () => {
  const [note, setNote] = useState(() => localStorage.getItem('borneo_quick_note') || '');

  const handleChange = (e) => {
    setNote(e.target.value);
    localStorage.setItem('borneo_quick_note', e.target.value);
  };

  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-5 hover:border-[#ff6b00]/30 transition-all flex flex-col h-[260px]">
      <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">
        <FileText size={14} className="text-[#ff6b00]" />
        <h3>Fleeting Scratchpad</h3>
      </div>
      <textarea
        value={note}
        onChange={handleChange}
        placeholder="Catch an unexpected terminal output or ideas instantly..."
        className="flex-1 w-full bg-white/[0.01] border border-white/5 rounded-xl p-3 text-xs text-gray-300 placeholder-gray-700 resize-none focus:outline-none focus:border-[#ff6b00]/30 font-mono leading-relaxed"
      />
    </div>
  );
};

// ─── MAIN CORE DASHBOARD (ASYMMETRIC GRID CONFIGURATION) ───
const Dashboard = () => {
  const [hours, setHours] = useState(new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => setHours(new Date().getHours()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    if (hours < 12) return 'Selamat Pagi';
    if (hours < 16) return 'Selamat Siang';
    if (hours < 20) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Greeting Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-gradient-to-r from-[#111] to-transparent border border-white/5 rounded-2xl p-6 relative overflow-hidden select-none">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ff6b00]/5 blur-3xl pointer-events-none"></div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">
            {getGreeting()}, <span className="text-[#ff6b00]">Operator</span>
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-1">
            System core layout synchronized successfully. No fatal logs detected.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 self-start md:self-auto">
          <CloudSun size={18} className="text-amber-400 animate-pulse" />
          <div className="font-mono">
            <p className="text-xs text-white font-medium">Surabaya, ID</p>
            <p className="text-[10px] text-gray-500">28°C • Partly Cloudy</p>
          </div>
        </div>
      </div>

      {/* ─── ARSITEKTUR GRID UTAMA BORNEOOS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* SISI KIRI: Workspace Utama (Mengambil 2 dari 3 kolom) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Card Finansial Mengambil Ruang Horizontal Penuh di Kiri */}
          <FinanceWidget />
          
          {/* Sub-grid 2 Kolom untuk Tugas & Catatan Kiri-Kanan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TodoWidget />
            <NotesWidget />
          </div>
        </div>

        {/* SISI KANAN: Utility Section (Mengambil 1 dari 3 kolom) */}
        <div className="lg:col-span-1 h-full lg:h-[420px]">
          <CalendarWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;