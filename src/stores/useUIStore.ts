import { create } from 'zustand'

type UIStore = {
    isSidemenuOpen: boolean;
    openSidemenu: () => void;
    closeSidemenu: () => void;
    toggleSidemenu: () => void;
};

export const useUIStore = create<UIStore>((set, get) => ({
    isSidemenuOpen: false,
    openSidemenu: () => set({ isSidemenuOpen: true }),
    closeSidemenu: () => set({ isSidemenuOpen: false }),
    toggleSidemenu: () => set({ isSidemenuOpen: !get().isSidemenuOpen }),
}));
