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
                const response = await axios.get('http://api.asistencia.test/api/personal', { params: { page: {size: 5, number: 1} } });
                console.log("response  ====> ", response)
                this.personal = response.data.data.map((item: any) => {
                    return {
                        id: item.id,
                        name: item.attributes.name,
                        last_name: item.attributes.last_name,
                        identification_number: item.attributes.identification_number,
                        code: item.attributes.code,
                        date_of_birth: item.attributes.date_of_birth,
                        email: item.attributes.email,
                        charge: item.attributes.charge,
                        status: item.attributes.status,
                    }
                })
                
            } catch (error) {

            }
        }
    }
});