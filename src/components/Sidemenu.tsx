import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUIStore } from '../stores/useUIStore';

export default function Sidemenu() {
    const closeSidemenu = useUIStore((state) => state.closeSidemenu);

    return (
        <div className="h-full bg-white shadow-lg flex flex-col p-4">
            <div className="flex justify-end">
                <button onClick={closeSidemenu} className="cursor-pointer">
                    <X />
                </button>
            </div>
            <nav className="mt-4 space-y-2 text-[#1E293B]">
                <Link to="/" className="block">Network</Link>
                <Link to="/characters" className="block">Characters list</Link>
                <Link to="/my-profile" className="block">Profile</Link>
                <Link to="/settings" className="block">Settings</Link>
            </nav>
        </div>
    );
}
