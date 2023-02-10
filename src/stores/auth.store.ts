import { defineStore } from "pinia";
import axios from 'axios';
import router from '../routes';

axios.defaults.withCredentials = true;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        loggedIn: false,
        returnUrl: '/dashboard',
        errors: [],
        message: '',
        statusRespose: false
    }),

    actions: {
        async login(email: string, password: string) {
            try {
                
                await axios.get(`http://api.asistencia.test/sanctum/csrf-cookie`);

                await axios.post(`http://api.asistencia.test/login`, { email: email, password: password });

                await this.getUser();
                this.statusRespose = true;
                this.loggedIn = true;

                console.log(" this.loggedIn ======> ", this.loggedIn);
                // redirect to previous url or default to home page
                router.push(this.returnUrl);
            } catch (error:any) {
                this.message = error.response.data.message;
                this.errors = error.response.data.errors;
                this.statusRespose = false;
            }
        },
        async logout() {
            await axios.post(`http://api.asistencia.test/logout`);
            this.user = null;
            this.statusRespose = false;
            this.loggedIn = false;
            // localStorage.removeItem('user');
            router.push('/login');
        },
        async getUser(){
            const res  = await axios.get(`http://api.asistencia.test/api/user`);
            // update pinia state
            this.user = res.data.data;
        }
    }
});