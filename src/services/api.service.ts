import axios from 'axios';
import { storeToRefs, mapActions } from 'pinia';
import { useAuthStore } from '../stores/auth.store';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://api.asistencia.test/';

axios.interceptors.response.use(resp => resp, async error => {

    const authStore = useAuthStore();

    const { loggedIn, user } = storeToRefs(authStore);

    // if (error.response.status === 401 && !refresh) {
    if (error.response.status === 401) {
        loggedIn.value = false;
        user.value = null
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user_id');
    }


    if (error.response.status === 429) {
        loggedIn.value = false;
        user.value = null
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user_id');
    }

    throw error;
});

export const apiService = {

    async login(data: any) {
        try {
            await axios.get(`sanctum/csrf-cookie`);

            await axios.post(`login`, data);

        } catch (error: any) {
            throw error;
        }
    },

    //http://api.asistencia.test/api/personal, await axios.get('http://api.asistencia.test/api/personal', { params: { page: 1, per_page: 15 } });
    async get(url: string, params?: {}) {
        try {
            const response = await axios.get(url, { params: params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async post(url: string, data?: any) {
        try {
            const response = await axios.post(url, data);
            return response.data;
        } catch (error:any) {
            throw error;
        }
    },
    async put(url: string, data?: any) {
        try {
            const respose = await axios.put(url, data);
            return respose.data;
        } catch (error) {
            throw error;
        }
    },
    async delete(url: string) {
        try {
            const respose = await axios.delete(url);
            return respose.data;
        } catch (error) {
            throw error;
        }
    }

};