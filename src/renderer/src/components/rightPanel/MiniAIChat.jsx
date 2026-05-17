import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { osConfig } from '../../config/osConfig';

const MiniAIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ada yang bisa saya bantu dengan cepat, Operator?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { 
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');
    setLoading(true);

    try {
      const endpoint = window.api ? 'http://localhost:11434/api/chat' : '/api_ai/api/chat';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: osConfig.aiConfig?.model || "qwen2.5-coder:1.5b",
          messages: [{ role: 'user', content: userText }],
          stream: false
        })
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message?.content || 'Respon kosong.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Gagal terhubung ke engine AI lokal. Cek terminal Ollama Anda.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0b0b]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[#ff6b00]/10 border border-[#ff6b00]/20 text-white' 
                : 'bg-white/5 border border-white/5 text-gray-300'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-[10px] text-gray-500 font-mono animate-pulse flex items-center gap-1.5">
            <Sparkles size={10} className="text-[#ff6b00]" /> BorneoAI sedang berpikir...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-[#111] flex gap-2">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya AI Copilot..." 
          className="flex-1 bg-white/5 border border-white/5 text-xs window-input rounded-xl px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6b00]/30 font-sans"
        />
        <button type="submit" className="bg-[#ff6b00] text-black p-2 rounded-xl hover:bg-[#ff8533] transition-colors">
          <Send size={13} />
        </button>
      </form>
    </div>
  );
};

export default MiniAIChat;