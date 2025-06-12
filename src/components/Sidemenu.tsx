import { X } from 'lucide-react'

export default function Sidemenu({ onClose }: { onClose: () => void }) {
    return (
        <div className="h-full bg-white shadow-lg flex flex-col p-4">
            <div className="flex justify-end">
                <button onClick={onClose} className='cursor-pointer'>
                    <X />
                </button>
            </div>
            <nav className="mt-4 space-y-2">
                <a href="#" className="block text-gray-700">Network</a>
                <a href="#" className="block text-gray-700">Characters list</a>
                <a href="#" className="block text-gray-700">Settings</a>
            </nav>
        </div>
    )
}
