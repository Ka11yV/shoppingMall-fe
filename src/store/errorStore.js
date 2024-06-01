import { create } from "zustand";

const errorStore = create((set) => ({
    error: "",
    setError: (error) => set(() => ({ error: error })),
    clearError: () => set(() => ({ error: "" })),
}));

export default errorStore;
