import { create } from "zustand";
import api from "../utils/api";
import uiStore from "./uiStore";

const productStore = create((set, get) => ({
    product: "",
    totalPageNum: "",
    selectedProduct: null,
    loading: false,
    startLoading: () => {
        set({ loading: true });
    },
    stopLoading: () => {
        set({ loading: false });
    },
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
    setSelectedProduct: (product) => {
        try {
            set({ selectedProduct: product });
        } catch (error) {
            return error;
        }
    },
    editProduct: async (formData, id) => {
        try {
            const response = await api.put(`/product/${id}`, formData);
            if (response.status !== 200) throw new Error(response.error);
            uiStore.getState().showToastMessage("상품 수정완료", "success");
            get().getProductList({ page: 1, name: "" });
            return response.data;
        } catch (error) {
            console.log(error);
            uiStore.getState().showToastMessage(error.message, "error");
            return error;
        }
    },
    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`/product/${id}`);
            if (response.status !== 200) throw new Error(response.error);
            uiStore.getState().showToastMessage("상품 삭제완료", "success");
            get().getProductList({ page: 1, name: "" });
            return response.data;
        } catch (error) {
            uiStore.getState().showToastMessage(error.message, "error");
            return error;
        }
    },
    getProductDetail: async (id) => {
        try {
            get().startLoading();
            const response = await api.get(`/product/${id}`);
            if (response.status !== 200) throw new Error(response.error);
            get().stopLoading();
            return response.data;
        } catch (error) {
            uiStore.getState().showToastMessage(error.message, "error");
            return error;
        }
    },

}));

export default productStore;
