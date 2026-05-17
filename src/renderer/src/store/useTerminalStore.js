import { create } from 'zustand';

const useTerminalStore = create((set) => ({
  height: 260, // Tinggi default terminal (px)
  terminals: [{ id: 'term-1', name: 'bash (1)' }], // List terminal aktif
  activeTerminalId: 'term-1',
  
  setHeight: (newHeight) => set({ height: Math.max(150, Math.min(newHeight, 600)) }), // Batasi min 150px, max 600px
  
  addTerminal: () => set((state) => {
    const newId = `term-${Date.now()}`;
    const newCount = state.terminals.length + 1;
    return {
      terminals: [...state.terminals, { id: newId, name: `bash (${newCount})` }],
      activeTerminalId: newId,
    };
  }),

  closeTerminal: (id, e) => set((state) => {
    e.stopPropagation(); // Mencegah tab terklik saat menekan tombol close
    if (state.terminals.length === 1) return {}; // Jangan hapus jika sisa 1
    
    const newTerminals = state.terminals.filter((t) => t.id !== id);
    let newActiveId = state.activeTerminalId;
    
    if (state.activeTerminalId === id) {
      newActiveId = newTerminals[newTerminals.length - 1].id;
    }
    
    // Beri tahu backend jika berjalan di Electron
    if (window.api && window.api.closeTerminal) {
      window.api.closeTerminal(id);
    }

    return { terminals: newTerminals, activeTerminalId: newActiveId };
  }),

  setActiveTerminalId: (id) => set({ activeTerminalId: id }),
}));

export default useTerminalStore;