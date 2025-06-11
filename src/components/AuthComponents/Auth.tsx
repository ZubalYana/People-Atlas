import { useState } from 'react';
import Registration from './Registration';
import Login from './Login';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(false);

    const switchToLogin = () => setIsLogin(true);
    const switchToRegister = () => setIsLogin(false);

    return (
        <div className="w-full h-screen flex justify-center items-center p-4 bg-gray-50">
            {isLogin ? (
                <Login switchToRegister={switchToRegister} />
            ) : (
                <Registration switchToLogin={switchToLogin} />
            )}
        </div>
    );
}
