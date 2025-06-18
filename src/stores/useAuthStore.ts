import { create } from 'zustand'
import axios from 'axios';

type Character = {
    _id: string;
    isUser: boolean;
    userAuth?: {
        email?: string;
        password?: string;
        authProvider?: string;
    };
    owner?: string; //or Character if populated
    photo?: string;
    name: string;
    lastName?: string;
    patronymic?: string;
    nickname?: string;
    phone?: string;
    email?: string;
    instagram?: string;
    telegram?: string;
    facebook?: string;
    address?: string;
    tags?: any[]; //probably string in future, any is temporary
    otherRelationships?: any[]; //presumably type object, which will hold info about other relationships, to modify later
    birthday?: string;
    interests?: string;
    relatedEvents?: string;
    howDidYouMeet?: string;
    notes?: string;
};

type User = {
    _id: string;
    email: string;
    character?: Character;
};

type AuthState = {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    restoreAuth: () => void;
    fetchUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,

    setAuth: (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        set({ user, token });
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },

    restoreAuth: () => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        const token = localStorage.getItem('token');
        if (user && token) set({ user, token });
    },

    fetchUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await axios.get('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ user: res.data });
        } catch (err) {
            console.error('Failed to fetch user:', err);
        }
    },
}));
