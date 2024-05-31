import { create } from "zustand";
import api from "../utils/api";
import uiStore from "./uiStore";

const userStore = create((set) => ({
    user: null,
    error: "",
    setError: (val) => set({ error: val }),
    setUser: (user) => set({ user }),
    registerUser: async ({ name, email, password }, navigate) => {
        try {
            const response = await api.post("/user", { email, name, password });
            if (response.status !== 200) throw new Error(response.error);
            console.log("회원등록 성공");
            uiStore
                .getState()
                .showToastMessage("회원가입을 완료했습니다.", "success");
            navigate("/login");
        } catch (error) {
            console.log(error.message);
            uiStore.getState().showToastMessage(error.message, "error");
        }
    },
    loginwithEmail: async ({ email, password }) => {
        try {
            const response = await api;
        } catch (error) {
            uiStore.getState().showToastMessage(error.message, "error");
        }
    },
}));

export default userStore;
