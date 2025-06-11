import { create } from 'zustand';

type AlertStore = {
    message: string | null;
    severity: 'success' | 'error' | 'info' | 'warning' | null;
    setAlert: (message: string, severity: AlertStore['severity']) => void;
    clearAlert: () => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
    message: null,
    severity: null,
    setAlert: (message, severity) => set({ message, severity }),
    clearAlert: () => set({ message: null, severity: null }),
}));
