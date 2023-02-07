import { Personal } from "../models/Personal";
import { defineStore } from "pinia";
import axios from 'axios';

export type PersonalState = {
    personals: Personal[];
    personal: Personal | null;
    errors: any;
    message: string;
};

export const usePersonalStore = defineStore({
    id: 'personal',
    state: () => ({
        personals: [],
        personal: null,
        errors: [],
        message: ''
    } as PersonalState),

    actions: {
        async index() {
            try {
                const response = await axios.get('http://api.asistencia.test/api/personal', { params: { page: 1, per_page: 15 } });
                this.personals = response.data.data.map((item: any) => {

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

            } catch (error) {
                console.log(error);
            }
        },
        async store(data: Personal) {

            const response = await axios.post('http://api.asistencia.test/api/personal', data);
            
            if (response.data.status == true) {
                this.message = response.data.message;
            }

            if(response.data.status == false){
                this.message = response.data.message;
                this.errors = response.data.errors;
            }
        },
        async getById(id: any) {
            const response = await axios.get(`http://api.asistencia.test/api/personal/${id}`);
            this.personal = response.data.data;
        },
        async update(id: string, params: any) {
            await axios.put(`http://api.asistencia.test/api/personal/${id}`, params);
        },
        async delete(id: string) {

            await axios.delete(`http://api.asistencia.test/api/personal/${id}`);

            // remove personal from list after deleted
            this.personals = this.personals.filter((x: Personal) => x.id !== id);
        }
    }
});