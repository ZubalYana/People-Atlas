import Sidemenu from './Sidemenu';
import { Menu } from 'lucide-react';
import { useUIStore } from '../stores/useUIStore';
import { useAlertStore } from '../stores/useAlertStore';
import { Alert } from '@mui/material';

export default function PageLayout({ children }: { children: React.ReactNode }) {
    const isSidemenuOpen = useUIStore((state) => state.isSidemenuOpen);
    const toggleSidemenu = useUIStore((state) => state.toggleSidemenu);
    const openSidemenu = useUIStore((state) => state.openSidemenu);
    const closeSidemenu = useUIStore((state) => state.closeSidemenu);
    const { message, severity, clearAlert } = useAlertStore();

    return (
        <div className="flex h-screen overflow-hidden">
            <div
                className={`transition-all duration-300 ${isSidemenuOpen ? 'w-64' : 'w-0'}`}
            >
                {isSidemenuOpen && <Sidemenu />}
            </div>
            <div className="flex-1 bg-gray-100 p-4 relative overflow-y-auto">
                {!isSidemenuOpen && (
                    <button
                        onClick={openSidemenu}
                        className="absolute top-4 left-4 z-10 bg-white p-2 rounded-md shadow-md cursor-pointer"
                    >
                        <Menu />
                    </button>
                )}
                {children}
            </div>
            {message && severity && (
                <Alert
                    severity={severity}
                    onClose={clearAlert}
                    sx={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
                >
                    {message}
                </Alert>
            )}
        </div>
    );
}
