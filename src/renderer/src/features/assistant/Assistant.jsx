import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, User, Trash2, ShieldAlert, FileCode, CornerDownLeft } from 'lucide-react';
import { osConfig } from '../../config/osConfig';

// ─── PARSER INLINE UNTUK BOLD DAN LINE BREAKS ───
const parseInlineMarkdown = (text) => {
  if (!text) return '';

  // 1. Ekstrak format tulisan tebal (**teks**) menjadi elemen strong HTML
  const boldRegex = /\*\*(.*?)\*\*/g;
  const parts = text.split(boldRegex);

  return parts.map((part, index) => {
    // Setiap index ganjil adalah teks yang berada di dalam tanda bintang ganda (**)
    if (index % 2 === 1) {
      return <strong key={index} className="text-white font-bold bg-white/5 px-1 rounded text-[#ff6b00]">{part}</strong>;
    }
    return part;
  });
};

// ─── RENDERER KUSTOM MARKDOWN (TABEL, BLOK KODE, HEADING, BOLD) ───
const IntelligentResponseRenderer = ({ text }) => {
  if (!text) return null;

  // Pemisah blok kode (```lang ... ```) dan baris teks biasa
  const blocks = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 font-sans text-[12px] leading-relaxed text-gray-300">
      {blocks.map((block, bIdx) => {
        
        // 1. APABILA TERDETEKSI BLOK KODE (CODE BLOCK)
        if (block.startsWith('```')) {
          const lines = block.split('\n');
          const firstLine = lines[0].replace('```', '').trim();
          const language = firstLine || 'code';
          const codeContent = lines.slice(1, lines.length - 1).join('\n');

          return (
            <div key={bIdx} className="border border-white/5 rounded-xl overflow-hidden my-4 bg-black/50 font-mono shadow-inner">
              <div className="bg-white/5 px-4 py-1.5 text-[10px] text-gray-400 flex justify-between items-center border-b border-white/5 uppercase select-none">
                <span>{language}</span>
                <span className="text-[9px] bg-[#ff6b00]/10 px-1.5 py-0.5 rounded text-[#ff6b00]">Source</span>
              </div>
              <pre className="p-4 overflow-x-auto text-amber-100/90 text-xs">
                <code>{codeContent}</code>
              </pre>
            </div>
          );
        }

        // 2. APABILA TERDETEKSI STRUKTUR TABEL MARKDOWN
        if (block.includes('|') && block.split('\n').some(line => line.trim().startsWith('|'))) {
          const lines = block.split('\n').filter(line => line.trim() !== '');
          const tableData = lines.map(line => 
            line.split('|').map(cell => cell.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1)
          );

          const headers = tableData[0];
          const bodyRows = tableData.slice(2);

          return (
            <div key={bIdx} className="overflow-x-auto my-4 border border-white/5 rounded-xl bg-white/[0.01] shadow-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5 select-none text-gray-200 font-medium">
                    {headers?.map((header, hIdx) => (
                      <th key={hIdx} className="p-3 font-mono text-[11px] text-[#ff6b00]">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 font-mono text-[11px]">{parseInlineMarkdown(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // 3. APABILA TERDETEKSI BARIS TEKS BIASA ATAU HEADING
        const lines = block.split('\n');
        return (
          <div key={bIdx} className="space-y-2">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              
              // Parsing Heading 1 (# Judul)
              if (trimmed.startsWith('# ')) {
                return (
                  <h1 key={lIdx} className="text-base font-bold text-white border-b border-white/5 pb-1 mt-4 mb-2 tracking-tight flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#ff6b00] rounded-full"></span>
                    {parseInlineMarkdown(trimmed.replace('# ', ''))}
                  </h1>
                );
              }
              
              // Parsing Heading 2 (## Sub Judul)
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={lIdx} className="text-sm font-semibold text-white mt-3 mb-1 tracking-tight text-gray-100">
                    {parseInlineMarkdown(trimmed.replace('## ', ''))}
                  </h2>
                );
              }

              // Parsing Heading 3 (### Sub-Sub Judul)
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={lIdx} className="text-xs font-semibold text-gray-200 mt-2 mb-1 uppercase tracking-wider text-[#ff6b00]">
                    {parseInlineMarkdown(trimmed.replace('### ', ''))}
                  </h3>
                );
              }

              // Jika baris kosong, render spasi baris ganti paragraf
              if (line === '') {
                return <div key={lIdx} className="h-2" />;
              }

              // Render baris kalimat standar dengan dukungan cetak tebal inline
              return (
                <p key={lIdx} className="text-gray-300 leading-relaxed min-h-[18px]">
                  {parseInlineMarkdown(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// ─── COMPONENT CORE ASSISTANT (LOGIKA CORE UTAMA) ───
const Assistant = () => {
  // ... State management (messages, input, isLoading, attachedFiles) biarkan tetap utuh seperti kemarin ...
  const [messages, setMessages] = useState([
    { 
      id: 'init', 
      role: 'assistant', 
      content: '# BorneoAI Copilot\n## Engine Aktif Terdeteksi\nSelamat datang Operator. Sistem parser markdown terbaru telah berhasil dikompilasi ke dalam inti kernel UI.\n\nSekarang saya sudah bisa memproses tulisan **teks tebal**, struktur **tabel biner**, hingga tingkatan # Heading dengan rapi.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const readFileContentAsync = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve({ name: file.name, size: (file.size / 1024).toFixed(1) + ' KB', content: event.target.result });
      };
      reader.readAsText(file);
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const processedFiles = await Promise.all(files.map(file => readFileContentAsync(file)));
    setAttachedFiles([...attachedFiles, ...processedFiles]);
  };

  const removeAttachment = (index) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && attachedFiles.length === 0) return;

    const userRawPrompt = input;
    const currentAttachments = [...attachedFiles];
    
    let finalPromptInjected = "";
    if (currentAttachments.length > 0) {
      finalPromptInjected += "=== KONTEKS LAMPIRAN BERKAS OPERATOR ===\n";
      currentAttachments.forEach(file => {
        finalPromptInjected += `[Nama File: ${file.name}]\n\`\`\`\n${file.content}\n\`\`\`\n\n`;
      });
      finalPromptInjected += "=== PERTANYAAN OPERATOR ===\n";
    }
    finalPromptInjected += userRawPrompt;

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userRawPrompt, files: currentAttachments }]);
    setInput('');
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      const endpoint = window.api ? 'http://localhost:11434/api/chat' : '/api_ai/api/chat';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: osConfig.aiConfig.model,
          messages: [
            { role: 'system', content: osConfig.aiConfig.systemPrompt },
            { role: 'user', content: finalPromptInjected }
          ],
          stream: false 
        })
      });

      if (!response.ok) throw new Error('API offline');
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.message?.content || 'Pesan kosong.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', isError: true, content: `⚠️ Jaringan gagal terhubung ke model [${osConfig.aiConfig.model}]!` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#141414] text-gray-200">
      {/* Top Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#111] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#ff6b00]/10 rounded-xl text-[#ff6b00]">
            <Bot size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">BorneoAI Deep Context Engine</h2>
            <p className="text-[10px] font-mono text-gray-500">Active Config Model: <span className="text-[#ff6b00]">{osConfig.aiConfig.model}</span></p>
          </div>
        </div>
      </div>

      {/* ─── CONTAINER SCROLL OBROLAN: DIBERIKAN SEKAT GANG VERTIDAL LEGA (space-y-8) ─── */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#141414] scrollbar-thin">
        {messages.map((msg) => {
          const isAI = msg.role === 'assistant';
          return (
            <div key={msg.id} className={`flex gap-4 ${isAI ? 'justify-start' : 'justify-end animate-in fade-in duration-300'}`}>
              {isAI && (
                <div className="w-8 h-8 rounded-lg bg-[#ff6b00]/10 text-[#ff6b00] flex items-center justify-center shrink-0 border border-[#ff6b00]/10">
                  <Bot size={16} />
                </div>
              )}

              {/* Chat Bubble dengan padding internal yang lapang */}
              <div className={`max-w-[80%] rounded-2xl p-5 border shadow-md transition-all
                ${isAI 
                  ? msg.isError 
                    ? 'bg-red-950/10 border-red-500/20 text-red-200 font-mono' 
                    : 'bg-[#1a1a1a] border-white/5 shadow-black/40' 
                  : 'bg-[#ff6b00]/10 border-[#ff6b00]/20 text-white shadow-[#ff6b00]/5'}`}
              >
                <IntelligentResponseRenderer text={msg.content} />

                {msg.files && msg.files.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#ff6b00]/10 space-y-1">
                    {msg.files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-mono bg-black/30 px-2 py-1 rounded border border-white/5 text-gray-400 w-fit">
                        <FileCode size={12} className="text-[#ff6b00]" />
                        <span>{f.name} ({f.size})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {!isAI && (
                <div className="w-8 h-8 rounded-lg bg-[#ff6b00] text-black font-bold flex items-center justify-center text-xs shrink-0 select-none shadow-[0_0_12px_rgba(255,107,0,0.3)] border border-[#ff914d]/20">
                  <User size={16} />
                </div>
              )}
            </div>
          );
        })}
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-lg bg-[#ff6b00]/10 text-[#ff6b00] flex items-center justify-center shrink-0 border border-[#ff6b00]/10">
              <Bot size={16} className="animate-spin" />
            </div>
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#ff6b00] rounded-full animate-bounce duration-300"></span>
              <span className="w-1.5 h-1.5 bg-[#ff6b00] rounded-full animate-bounce [animation-delay:0.15s] duration-300"></span>
              <span className="w-1.5 h-1.5 bg-[#ff6b00] rounded-full animate-bounce [animation-delay:0.3s] duration-300"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area Bottom */}
      <div className="p-4 bg-[#111] border-t border-white/5 shrink-0">
        <div className="max-w-5xl mx-auto flex flex-col bg-[#161616] border border-white/5 rounded-xl overflow-hidden focus-within:border-[#ff6b00]/30 transition-colors">
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-black/20 border-b border-white/5">
              {attachedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-md px-2 py-1 text-[10px] font-mono text-gray-300 animate-in fade-in duration-150">
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button type="button" onClick={() => removeAttachment(idx)} className="text-gray-500 hover:text-red-400 transition-colors ml-1"><Trash2 size={11} /></button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-end px-4 py-3 gap-2 relative">
            <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-gray-500 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors shrink-0 mb-0.5"><Paperclip size={15} /></button>
            <textarea rows={1} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Tanyakan kode atau lampirkan file berkas untuk dianalisis..." className="flex-1 bg-transparent border-none py-1.5 text-xs text-gray-200 placeholder-gray-600 focus:outline-none resize-none max-h-32 min-h-[24px] overflow-y-auto leading-relaxed" />
            <div className="flex items-center gap-3 shrink-0 mb-0.5">
              <span className="text-[9px] font-mono text-gray-600 select-none flex items-center gap-1"><span>Enter to Send</span><CornerDownLeft size={8} /></span>
              <button type="button" onClick={handleSendMessage} disabled={!input.trim() && attachedFiles.length === 0} className="bg-[#ff6b00] text-black p-2 rounded-lg hover:bg-[#ff8533] disabled:opacity-20 transition-all shadow-[0_0_10px_rgba(255,107,0,0.2)]"><Send size={13} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;