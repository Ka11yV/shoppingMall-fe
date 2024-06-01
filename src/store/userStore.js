import { create } from "zustand";
import api from "../utils/api";
import uiStore from "./uiStore";
import errorStore from "./errorStore";

const userStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    registerUser: async ({ name, email, password }, navigate) => {
        try {
            const response = await api.post("/user", { email, name, password });
            if (response.status !== 200) throw new Error(response.error);
            uiStore
                .getState()
                .showToastMessage("회원가입을 완료했습니다.", "success");
            navigate("/login");
            return response;
        } catch (error) {
            return error;
        }
    },
    loginUser: async ({ email, password }, navigate) => {
        try {
            const response = await api.post("/auth/login", { email, password });
            if (response.status !== 200) {
                throw new Error(response.error);
            }
            uiStore.getState().showToastMessage("로그인 성공.", "success");
            navigate("/");
            return response;
        } catch (error) {
            return error;
        }
    },
}));

export default userStore;
