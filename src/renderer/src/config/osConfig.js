export const osConfig = {
  system: {
    version: "0.1.0",
    codename: "BorneoOS Desktop"
  },
  shortcuts: {
    toggleSidebar: { key: "b", ctrl: true, alt: false },
    toggleTerminal: { key: "`", ctrl: true, alt: false },
    toggleSearch: { key: "k", ctrl: true, alt: false },
    panelAI: { key: "a", ctrl: false, alt: true },
    panelBrowser: { key: "b", ctrl: false, alt: true },
    panelWhatsApp: { key: "w", ctrl: false, alt: true },
    panelCalc: { key: "c", ctrl: false, alt: true },
    panelNotifications: { key: "n", ctrl: false, alt: true },
  },
  sidebarMenu: [
    { id: 'dashboard', label: 'Dashboard Center', icon: 'LayoutDashboard' },
    { id: 'assistant', label: 'Borneo AI Copilot', icon: 'Bot' }, // <-- Tambah Baris Ini
    { id: 'whatsapp', label: 'WhatsApp Space', icon: 'MessageSquare' },
    { id: 'ide', label: 'Borneo Code Core', icon: 'Code2' },
    { id: 'finance', label: 'Finance Ledger', icon: 'Wallet' },
  ],
  aiConfig: {
    model: "qwen2.5-coder:1.5b", // <-- Ganti nama model di sini saat halaman setting di-edit nanti
    systemPrompt: "You are BorneoAI, an integrated developer assistant inside BorneoOS. You must provide clean code blocks and format data as markdown tables when requested."
  }
};