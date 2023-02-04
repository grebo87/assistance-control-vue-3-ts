import { Personal } from "../models/Personal";
import { defineStore } from "pinia";
import axios from 'axios';

export type PersonalState = {
    personal: Personal[];
};

export const usePersonalStore = defineStore({
    id: 'personal',
    state: () => ({
        personal: [],
    } as PersonalState),

    actions: {
        async index() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');

                this.personal = response.data.map((item: any) => {
                    return {
                        name: item.name,
                        last_name: item.username,
                        identification_number: item.phone,
                        code: item.id,
                        date_of_birth: item.name,
                        email: item.email,
                        charge: 'Administrativo',
                        status: 'Activo'
                    }
                })
                
            } catch (error) {

            }
        }
    }
});