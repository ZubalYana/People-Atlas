import Sidemenu from './Sidemenu';
import { Menu } from 'lucide-react';
import { useUIStore } from '../stores/useUIStore';

export default function PageLayout({ children }: { children: React.ReactNode }) {
    const isSidemenuOpen = useUIStore((state) => state.isSidemenuOpen);
    const toggleSidemenu = useUIStore((state) => state.toggleSidemenu);
    const openSidemenu = useUIStore((state) => state.openSidemenu);
    const closeSidemenu = useUIStore((state) => state.closeSidemenu);

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
        </div>
    );
}
