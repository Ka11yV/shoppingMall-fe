import { create } from "zustand";
import api from "../utils/api";
import uiStore from "./uiStore";

const productStore = create((set) => ({
    product: "",
    totalPageNum: "",
    createProduct: async (formData) => {
        try {
            const response = await api.post("/product", formData);
            if (response.status !== 200) throw new Error(response.error);
            uiStore.getState().showToastMessage("상품 생성 완료", "success");
        } catch (error) {
            uiStore.getState().showToastMessage(error.message, "error");
            return error;
        }
    },
    getProductList: async (query) => {
        try {
            console.log(query);
            const response = await api.get("/product", {
                params: { ...query },
            });
            if (response.status !== 200) throw new Error(response.error);
            // uiStore.getState().showToastMessage("상품 로딩 완료", "success");
            set({ product: response.data.data });
            set({ totalPageNum: response.data.totalPageNum });
        } catch (error) {
            uiStore.getState().showToastMessage(error.message, "error");
            return error;
        }
    },
}));

export default productStore;
