import { create } from "zustand";
import uiStore from "./uiStore";
import api from "../utils/api";
import cartStore from "./cartStore";

const orderStore = create((set, get) => ({
    orderList: [],
    orderNum: "",
    selectedOrder: [],
    setSelectedOrder: (order) => {
        set({ selectedOrder: order });
    },
    createOrder: async (data) => {
        try {
            const response = await api.post("/order", data);
            if (response.status !== 200) throw new Error(response.error);
            uiStore
                .getState()
                .showToastMessage("주문이 완료되었습니다", "success");
            set({ orderNum: response.data.orderNum.toString() });
            cartStore.getState().clearCart();
            return response;
        } catch (error) {
            uiStore.getState().showToastMessage(error.message, "error");
            return error;
        }
    },
    getOrder: async ({ page = 1, ordernum }) => {
        try {
            const response = await api.get("/order", {
                params: { page, ordernum },
            });
            if (response.status !== 200) throw new Error(response.error);
            const orders = response.data.data || [];
            set({ orderList: orders });
            return response;
        } catch (error) {
            uiStore.getState().showToastMessage(error.message, "error");
            return error;
        }
    },
    updateOrder: async (orderId, status) => {
        try {
            const order = await api.put("/order", { orderId, status });
            console.log(order);
        } catch (error) {
            return error;
        }
    },
}));

export default orderStore;
