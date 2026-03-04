import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'auto';

type UIState = {
    theme: ThemeMode;
};

type UIActions = {
    setTheme: (theme: ThemeMode) => void;
    cycleTheme: () => void;
};

export type UIStore = UIState & UIActions;

type AsyncStorageLike = {
    getItem: (name: string) => Promise<string | null>;
    setItem: (name: string, value: string) => Promise<void>;
    removeItem: (name: string) => Promise<void>;
};

const inMemoryStore = new Map<string, string>();

let asyncStorageModule: AsyncStorageLike | null = null;

try {
    asyncStorageModule = require('@react-native-async-storage/async-storage')
        .default as AsyncStorageLike;
} catch {
    asyncStorageModule = null;
}

let warnedStorageUnavailable = false;

function warnStorageUnavailable(error: unknown) {
    if (warnedStorageUnavailable) {
        return;
    }

    warnedStorageUnavailable = true;
    console.warn(
        'AsyncStorage unavailable. UI state persistence is disabled for this session.',
        error,
    );
}

const safeStorage: StateStorage = {
    getItem: async (name) => {
        try {
            if (asyncStorageModule) {
                return await asyncStorageModule.getItem(name);
            }

            return inMemoryStore.get(name) ?? null;
        } catch (error) {
            warnStorageUnavailable(error);
            return null;
        }
    },
    setItem: async (name, value) => {
        try {
            if (asyncStorageModule) {
                await asyncStorageModule.setItem(name, value);
                return;
            }

            inMemoryStore.set(name, value);
        } catch (error) {
            warnStorageUnavailable(error);
        }
    },
    removeItem: async (name) => {
        try {
            if (asyncStorageModule) {
                await asyncStorageModule.removeItem(name);
                return;
            }

            inMemoryStore.delete(name);
        } catch (error) {
            warnStorageUnavailable(error);
        }
    },
};

export const useUIStore = create<UIStore>()(
    persist(
        (set, get) => ({
            theme: 'auto',
            setTheme: (theme) => set({ theme }),
            cycleTheme: () => {
                const currentTheme = get().theme;
                const nextTheme =
                    currentTheme === 'auto' ? 'light' : currentTheme === 'light' ? 'dark' : 'auto';
                set({ theme: nextTheme });
            },
        }),
        {
            name: 'ui-store',
            storage: createJSONStorage(() => safeStorage),
            partialize: (state) => ({ theme: state.theme }),
        },
    ),
);
