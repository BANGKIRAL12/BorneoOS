import { create } from 'zustand';

const useOSStore = create((set) => ({
  activeTab: 'dashboard', // default tab
  setActiveTab: (tab) => set({ activeTab: tab }),
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}));

export default useOSStore;