import { create } from 'zustand';
import uiStore from './uiStore';
import api from '../utils/api';

const orderStore = create((set, get) => ({
    createOrder: async (data) => {
        try {
            const response = await api.post('/order', data);
            if (response.status !== 200) throw new Error(response.error);
            return response
        } catch (error) {
            uiStore.getState().showToastMessage(error.message, 'error');
            return error;
        }
    }
}));

export default orderStore;
