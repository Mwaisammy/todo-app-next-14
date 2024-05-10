import { create } from 'zustand';

type Props = {
    editing: boolean;
    setEditing: (editing: boolean) => void;

}


export const useSomething = create<Props>((set) => ({
    editing: false,
    setEditing: (editing) => set({ editing })

}))
