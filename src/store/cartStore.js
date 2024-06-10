import { create } from "zustand";
import api from "../utils/api";
import uiStore from "./uiStore";

const cartStore = create((set) => ({
    cart: [], // initial state
    cartItemQty: 0,
    totalPrice: 0,
    addToCart: async ({ id, size }) => {
        try {
            const response = await api.post("/cart", {
                productId: id,
                size,
                qty: 1,
            });
            if (response.status !== 200) throw new Error(response.error);
            uiStore
                .getState()
                .showToastMessage("카트에 상품이 추가됐습니다", "success");
            set({ cartItemQty: response.data.cartItemQty });
            return response;
        } catch (error) {
            uiStore.getState().showToastMessage(error.message, 'error')
        }
    },
    getCartItems: async () => {
        try {
            const response = await api.get("/cart");
            if (response.status !== 200) throw new Error(response.error);
            const items = response.data.data[0].items;
            const totalPrice = items.reduce((total, item) => {
                if (item.productId && item.productId.price) {
                    return total + item.productId.price * item.qty;
                }
                return total;
            }, 0);
            set({ cart: items, totalPrice: totalPrice });
            return items;
        } catch (error) {
            return error;
        }
    },
    getCartItemQty: async ({ user }) => {
        try {
            const response = await api.post("/cart/cartSize", { user });
            if (response.status !== 200) throw new Error(response.error);
            set({ cartItemQty: response.data.cartItemQty });
            return response;
        } catch (error) {
            return error;
        }
    },
    deleteCartItem: async (id) => {
        try {
            const response = await api.delete("/cart", {
                data: {
                    id: id,
                },
            });
            if (response.status !== 200) throw new Error(response.error);
            uiStore.getState().showToastMessage('상품을 삭제했습니다', 'success')
        } catch (error) {
            return error;
        }
    },
    setItemQty: async(id, qty) => {
        try {
            console.log(id, qty)
            const response = await api.post('/cart/setItemQty', {id, qty})
            console.log(response)
        } catch(error) {
            return error;
        }
    }
}));

export default cartStore;
