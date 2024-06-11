import { create } from 'zustand';
import uiStore from './uiStore';
import api from '../utils/api';

const orderStore = create((set, get) => ({
    orderNum: "",
    createOrder: async (data) => {
        try {
            const response = await api.post('/order', data);
            if (response.status !== 200) throw new Error(response.error);
            
            uiStore.getState().showToastMessage('주문이 완료되었습니다', 'success')
            set({orderNum: response.data.orderNum.toString()})
        } catch (error) {
            uiStore.getState().showToastMessage(error.message, 'error');
            return error;
        }
    }
}));


export default orderStore;
