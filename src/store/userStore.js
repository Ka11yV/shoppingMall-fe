import { create } from "zustand";
import api from "../utils/api";
import uiStore from "./uiStore";
import errorStore from "./errorStore";

const userStore = create((set, get) => ({
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
    loginWithToken: async () => {
        try {
            const response = await api.get("/user/me");
            if (response.status !== 200) throw new Error(response.error);
            set({ user: response.data.user });
        } catch (error) {
            console.log("Login error:", error);
            return error;
        }
    },
    logoutUser: async () => {
        try {
            sessionStorage.removeItem("token");
            set({ user: null });
        } catch (error) {
            console.log(error);
        }
    },
    loginWithGoogle: async (token) => {
        try {
            const response = await api.post("/auth/google", { token });
            console.log(response.data.token);
            sessionStorage.setItem("token", response.data.token);
            set({ user: response.data.user });
            if (response.status !== 200) throw new Error(response.error);
            return response.data;
        } catch (error) {
            uiStore.getState().showToastMessage(error.error, "error");
            console.log(error);
        }
    },
}));

export default userStore;
