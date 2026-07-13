import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistStore {
  handles: string[];
  add: (handle: string) => void;
  remove: (handle: string) => void;
  toggle: (handle: string) => void;
  has: (handle: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      handles: [],
      add: (handle) =>
        set((s) => (s.handles.includes(handle) ? s : { handles: [handle, ...s.handles] })),
      remove: (handle) => set((s) => ({ handles: s.handles.filter((h) => h !== handle) })),
      toggle: (handle) =>
        set((s) =>
          s.handles.includes(handle)
            ? { handles: s.handles.filter((h) => h !== handle) }
            : { handles: [handle, ...s.handles] }
        ),
      has: (handle) => get().handles.includes(handle),
      clear: () => set({ handles: [] }),
    }),
    {
      name: 'lovcicov-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
