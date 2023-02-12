import { Personal } from "../models/Personal";
import { defineStore } from "pinia";
import { apiService } from "../services/api.service";

export type PersonalState = {
    personals: Personal[];
    personal: Personal;
    errors: any;
    message: string;
    statusRespose: boolean;
};

export const usePersonalStore = defineStore({
    id: 'personal',
    state: () => ({
        personals: [],
        personal: {
            id: '',
            name: '',
            last_name: '',
            identification_number: '',
            code: '',
            date_of_birth: '',
            email: '',
            charge: '',
            status: '',
            assistance: {
                id: '',
                date: '',
                start_time: '',
                time_of: '',
                personal_id: '',
            }
        },
        errors: [],
        message: '',
        statusRespose: false
    } as PersonalState),

    actions: {
        async index() {
            try {
                const response = await apiService.get('api/personal', { page: 1, per_page: 15 });
                this.personals = response.data.map((item: any) => {

                    return {
                        id: item.id,
                        name: item.name,
                        last_name: item.last_name,
                        identification_number: item.identification_number,
                        code: item.code,
                        date_of_birth: item.date_of_birth,
                        email: item.email,
                        charge: item.charge,
                        status: item.status,
                    }
                })

            } catch (error: any) {
                this.message = error.response.data.message;
                this.errors = error.response.data.errors;
                this.statusRespose = false;
            }
        },
        async getPersonalWithAssistance() {
            try {
                const response = await apiService.get('api/personal', { page: 1, per_page: 15, assistance: true })
                this.personals = response.data

            } catch (error) {
                // console.log(error);
            }
        },
        async store(data: Personal) {
            const response = await apiService.post('api/personal', data);
            if (response.status == true) {
                this.message = response.message;
                this.statusRespose = true;
            }

            if (response.status == false) {
                this.message = response.message;
                this.errors = response.errors;
                this.statusRespose = false;
            }
        },
        async getById(id: any) {
            const response = await apiService.get(`api/personal/${id}`);
            this.personal = response.data;
        },
        async update(id: string, params: Personal) {
            const response = await apiService.put(`api/personal/${id}`, params);

            if (response.status == true) {
                this.message = response.message;
                this.personal = response.data;
                this.statusRespose = true;
            }

            if (response.status == false) {
                this.message = response.message;
                this.errors = response.errors;
                this.statusRespose = false;
            }
        },
        async delete(id: string) {
            const response = await apiService.delete(`api/personal/${id}`);

            if (response.status == true) {
                // remove personal from list after deleted
                this.personals = this.personals.filter((x: Personal) => x.id !== id);
                this.statusRespose = true;
                this.message = response.message;
            }

            if (response.status == false) {
                this.message = response.message;
                this.errors = response.errors;
                this.statusRespose = false;
            }
        },
        async markStartTime(id: string) {
            const response = await apiService.post(`api/personal/${id}/mark-start-time`);

            if (response.status == true) {
                // find personal from list
                let personal = this.personals.map((person: any) => {
                    if (person.id == id) {
                        person.assistance = response.data;
                    }
                });
                this.statusRespose = true;
                this.message = response.message;
            }

            if (response.status == false) {
                this.message = response.message;
                this.errors = response.errors;
                this.statusRespose = false;
            }
        },
        async markTimeOf(id: string) {
            const response = await apiService.put(`api/personal/${id}/mark-time-of`);

            if (response.status == true) {
                // find personal from list
                this.personals.map((person: any) => {
                    if (person.id == id) {
                        person.assistance = response.data;
                    }
                });
                this.statusRespose = true;
                this.message = response.message;
            }

            if (response.status == false) {
                this.message = response.message;
                this.errors = response.errors;
                this.statusRespose = false;
            }
        },
        async findAbsenceById(id: any) {
            const response = await apiService.get(`api/personal/${id}/get-absences`);

            return response.data;
        },
        async verifyAbsenceByPersonalId(id: string) {
            const response = await apiService.get(`api/personal/${id}/verify-absences`);

            const { verify } = response.data;

            return verify;
        },
        async createAbsence(id: string, data: any) {
            const response = await apiService.post(`api/personal/${id}/store-absences`, data);

            if (response.status == true) {
                this.message = response.message;
                this.statusRespose = true;
                this.personals.map((person: any) => {
                    if (person.id == id) {
                        person.absence = response.data;
                    }
                });
            }

            if (response.status == false) {
                this.message = response.message;
                this.errors = response.errors;
                this.statusRespose = false;
            }
        },
        async getPersonalWithAbsence() {
            try {
                const response = await apiService.get(`api/personal`, { page: 1, per_page: 15, absence: true });
                this.personals = response.data;
            } catch (error) {
                // console.log(error);
            }
        },
        async deleteAbsence(id: string) {
            const response = await apiService.delete(`api/personal/${id}/destroy-absences`);

            if (response.status == true) {
                // remove personal from list after deleted
                this.personals.map((x: any) => {
                    if (x.id == id) {
                        delete x.absence
                    }
                });
                this.statusRespose = true;
                this.message = response.message;
            }

            if (response.status == false) {
                this.message = response.message;
                this.errors = response.errors;
                this.statusRespose = false;
            }
        },
        async updateAbsence(id: string, data: any) {
            const response = await apiService.put(`api/personal/${id}/update-absences`, data);

            if (response.status == true) {
                this.message = response.message;
                this.statusRespose = true;
                this.personals.map((person: any) => {
                    if (person.id == id) {
                        person.absence = response.data;
                    }
                });
            }

            if (response.status == false) {
                this.message = response.message;
                this.errors = response.errors;
                this.statusRespose = false;
            }
        }
    }
});


