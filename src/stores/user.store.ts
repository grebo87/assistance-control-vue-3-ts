import { defineStore } from "pinia";
import { apiService } from "../services/api.service";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        users: [],
        user: {
            id: '',
            name: '',
            email: ''
        },
        errors: [],
        message: '',
        statusRespose: false
    }),
    actions: {
        async getAll() {
            try {
                const response = await apiService.get('api/users', { page: 1, per_page: 15 });
                this.users = response.data
                this.statusRespose = true;

            } catch (error: any) {
                this.message = error.response.data.message;
                this.errors = error.response.data.errors;
                this.statusRespose = false;
            }
        },
        async store(data: any) {

            try {
                const response = await apiService.post('api/user', data);
                if (response.status == true) {
                    this.message = response.message;
                    this.statusRespose = true;
                }

                if (response.status == false) {
                    this.message = response.message;
                    this.errors = response.errors;
                    this.statusRespose = false;
                }
            } catch (error: any) {

                this.message = error.response.message;
                this.errors = error.response.data.errors;
                this.statusRespose = false;
            }
        },
        async getUserById(id: any) {
            try {
                const response = await apiService.get(`api/user/${id}`);
                this.user = response.data
                this.statusRespose = true;

            } catch (error: any) {
                this.message = error.response.data.message;
                this.errors = error.response.data.errors;
                this.statusRespose = false;
            }
        },
        async update(id: string, data: any) {

            try {
                const response = await apiService.put(`api/user/${id}`, data);
                if (response.status == true) {
                    this.message = response.message;
                    this.statusRespose = true;
                }

                if (response.status == false) {
                    this.message = response.message;
                    this.errors = response.errors;
                    this.statusRespose = false;
                }
            } catch (error: any) {

                this.message = error.response.message;
                this.errors = error.response.data.errors;
                this.statusRespose = false;
            }
        },
        async delete(id: string) {

            try {
                const response = await apiService.delete(`api/user/${id}`);
                if (response.status == true) {
                    this.message = response.message;
                    this.statusRespose = true;
                    // remove user from list after deleted
                    this.users = this.users.filter((x: any) => x.id !== id);
                }

                if (response.status == false) {
                    this.message = response.message;
                    this.errors = response.errors;
                    this.statusRespose = false;
                }
            } catch (error: any) {

                this.message = error.response.message;
                this.errors = error.response.data.errors;
                this.statusRespose = false;
            }
        },
    }
});