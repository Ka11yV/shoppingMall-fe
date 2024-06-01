import { create } from "zustand";

const errorStore = create((set) => ({
    error: "",
    setError: (error) => set(() => ({ error: error })),
}));

export default errorStore;
