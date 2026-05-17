import { create } from 'zustand';

const useOSStore = create((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  // Mengubah mekanisme sidebar ke sistem Expand / Collapse
  isSidebarExpanded: true, 
  toggleSidebarExpand: () => set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),

  isTerminalOpen: false,
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),

  isRightPanelOpen: false,
  rightPanelTab: 'ai',
  setRightPanelTab: (tab) => set((state) => {
    if (state.rightPanelTab === tab && state.isRightPanelOpen) {
      return { isRightPanelOpen: false };
    }
    return { rightPanelTab: tab, isRightPanelOpen: true };
  }),
  toggleRightPanel: () => set((state) => ({ isRightPanelOpen: !state.isRightPanelOpen })),
}));

export default useOSStore;