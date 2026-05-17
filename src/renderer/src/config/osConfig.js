export const osConfig = {
  system: {
    version: "0.1.0",
    codename: "BorneoOS Desktop"
  },
  // Mapping Shortcut Key
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
  // Pengaturan Nama Halaman & Icon Menu di Sidebar
  sidebarMenu: [
    { id: 'dashboard', label: 'Dashboard Center', icon: 'LayoutDashboard' },
    { id: 'whatsapp', label: 'WhatsApp Space', icon: 'MessageSquare' },
    { id: 'ide', label: 'Borneo Code Core', icon: 'Code2' },
    { id: 'finance', label: 'Finance Ledger', icon: 'Wallet' },
  ]
};