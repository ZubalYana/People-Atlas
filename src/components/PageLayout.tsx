import { useState } from 'react'
import Sidemenu from './Sidemenu'
import { Menu } from 'lucide-react'

export default function PageLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen overflow-hidden">
            <div
                className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'
                    }`}
            >
                {isSidebarOpen && <Sidemenu onClose={() => setIsSidebarOpen(false)} />}
            </div>

            <div className="flex-1 bg-gray-100 p-4 relative overflow-y-auto">
                {!isSidebarOpen && (
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="absolute top-4 left-4 z-10 bg-white p-2 rounded-md shadow-md cursor-pointer"
                    >
                        <Menu />
                    </button>
                )}
                {children}
            </div>
        </div>
    )
}
