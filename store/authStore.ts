import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
//persist can persist the token even the app was closed, store in device

import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = create(
    persist((set) => ({
        user: null,
        token: null,

        setUser: (user) => set({ user }),
        setToken: (token) => set({ token }),
    }),{
        name:'auth-store',
        storage:createJSONStorage(()=>AsyncStorage),
    })
);
