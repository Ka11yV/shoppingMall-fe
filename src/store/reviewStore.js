import { create } from 'zustand';
import api from '../utils/api';

const reviewStore = create((set) => ({
    reviewProductId: null,
    reviewOrderNum: '',
    setReviewOrderNum: (num) => {
        set({reviewOrderNum: num})
    },
    setReviewProductId: (id) => {
        set({reviewProductId: id})
    },
    addReview: async (newReview) => {
        try {
            const response = await api.post('/review', newReview);
            if (response.status !== 200) throw new Error(response.data.error || 'Error adding review');
            return response.data;
        } catch (error) {
            console.error('Failed to add review:', error);
            return error;
        }
    },
    getReviews: async (id) => {
        try {
            const response = await api.get(`/review/${id}`,);
            if (response.status !== 200) throw new Error(response.data.error || 'Error adding review');
            return response.data
        } catch(error) {
            return error
        }
    }
}));

export default reviewStore;
