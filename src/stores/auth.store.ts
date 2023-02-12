import { defineStore } from "pinia";
import router from '../routes';
import { apiService } from "../services/api.service";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        loggedIn: Boolean(localStorage.getItem('isLoggedIn')),
        returnUrl: '/dashboard',
        errors: [],
        message: '',
        statusRespose: false
    }),

    actions: {
        async login(email: string, password: string) {
            try {
                await apiService.login({ email: email, password: password });
                await this.getUser();
                this.statusRespose = true;
                this.loggedIn = true;

                localStorage.setItem('isLoggedIn', JSON.stringify(this.loggedIn));
                // redirect to previous url or default to home page
                router.push(this.returnUrl);
            } catch (error: any) {
                this.message = error.response.data.message;
                this.errors = error.response.data.errors;
                this.statusRespose = false;
                localStorage.removeItem('isLoggedIn');
            }
        },
        async logout() {
            try {
                const res = await apiService.post(`api/user/logout`);

                if (res.status == true) {
                    this.message = res.message;
                    this.errors = [];
                    this.user = null;
                    this.statusRespose = false;
                    this.loggedIn = false;
                    localStorage.removeItem('isLoggedIn');
                    router.push('/login');
                }
            } catch (error: any) {
                this.message = error.response.data.message;
                this.errors = [];
                this.user = null;
                this.statusRespose = false;
                this.loggedIn = false;
                localStorage.removeItem('isLoggedIn');
                router.push('/login');
            }
        },
        async getUser() {
            try {
                const res = await apiService.get(`api/user`);
                // update pinia state
                this.user = res.data;
                localStorage.setItem('user_id', JSON.stringify(this.user.id));
            } catch (error: any) {
                this.message = error.response.data.message;
                this.errors = [];
                this.user = null;
                localStorage.removeItem('user_id');
            }
        }
    }
});