<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { usePersonalStore } from '../../stores/personal.store';
import { Personal } from '../../models/Personal';
import router from '../../routes';

const personalStore = usePersonalStore();

const { errors, message, statusRespose } = storeToRefs(personalStore);

const form: Personal = reactive({
    id: '',
    name: '',
    last_name: '',
    identification_number: '',
    code: '',
    date_of_birth: '',
    email: '',
    charge: '',
    status: ''
});

const rules = {
    name: { reuired: helpers.withMessage('El nombre es requerido.', required) },
    last_name: { reuired: helpers.withMessage('El Apellido es requerido.', required) },
    identification_number: { reuired: helpers.withMessage('La cedula es requerida..', required) },
    code: { reuired: helpers.withMessage('El Código es requerido.', required) },
    date_of_birth: { reuired: helpers.withMessage('LA Fecha de nacimiento es requerida.', required) },
    email: { reuired: helpers.withMessage('El Correo es requerido.', required) },
    charge: { reuired: helpers.withMessage('El Cargo es requerido.', required) },
    status: { reuired: helpers.withMessage('El Estado es requerido.', required) }
};

const validate = useVuelidate<Personal>(rules, form);

const onSubmit = async () => {
    validate.value.$touch();

    if (validate.value.$invalid) return;

    await personalStore.store(form);
    if (statusRespose.value == true) {
        router.push({ name: 'personal.index' });
    }
};

</script>


<template>
    <form class="row g-3 " @submit.prevent="onSubmit">
        <div v-if="errors.length > 0" class="alert alert-danger">
            <ul>
                <li v-for="error in errors" >{{ error }}</li>
            </ul>
        </div>
        <div class="col-md-6">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" name="name" v-model="form.name">
            <span v-if="validate.name.$error" class="text-danger">
                {{ validate.name.$errors[0].$message }}
            </span>
        </div>
        <div class="col-md-6">
            <label for="last_name" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="last_name" name="last_name" v-model="form.last_name">
            <span v-if="validate.last_name.$error" class="text-danger">
                {{ validate.last_name.$errors[0].$message }}
            </span>
        </div>

        <div class="col-md-6">
            <label for="identification_number" class="form-label">Cedula</label>
            <input type="number" class="form-control" id="identification_number" name="identification_number"
                v-model="form.identification_number">
            <span v-if="validate.identification_number.$error" class="text-danger">
                {{ validate.identification_number.$errors[0].$message }}
            </span>
        </div>

        <div class="col-md-6">
            <label for="code" class="form-label">Codigó Personal</label>
            <input type="text" class="form-control" id="code" name="code" v-model="form.code">
            <span v-if="validate.code.$error" class="text-danger">
                {{ validate.code.$errors[0].$message }}
            </span>
        </div>

        <div class="col-md-6">
            <label for="date_of_birth" class="form-label">Fecha de Nacimiento</label>
            <input type="date" class="form-control" id="date_of_birth" name="date_of_birth"
                v-model="form.date_of_birth">
            <span v-if="validate.date_of_birth.$error" class="text-danger">
                {{ validate.date_of_birth.$errors[0].$message }}
            </span>
        </div>

        <div class="col-md-6">
            <label for="email" class="form-label">Correo</label>
            <input type="email" class="form-control" id="email" name="email" v-model="form.email">
            <span v-if="validate.email.$error" class="text-danger">
                {{ validate.email.$errors[0].$message }}
            </span>
        </div>

        <div class="col-md-6">
            <label for="charge" class="form-label">Cargo</label>
            <select id="charge" class="form-select" name="charge" v-model="form.charge">
                <option selected value=""> Elige una opción </option>
                <option value="Administrativo">Administrativo</option>
                <option value="Obrero">Obrero</option>
            </select>
            <span v-if="validate.charge.$error" class="text-danger">
                {{ validate.charge.$errors[0].$message }}
            </span>
        </div>
        <div class="col-md-6">
            <label for="status" class="form-label">Estatus</label>
            <select id="status" class="form-select" name="status" v-model="form.status">
                <option selected value=""> Elige una opción </option>
                <option value="Activo">Activo</option>
                <option value="Jubilado"> Jubilado</option>
                <option value="Retirado">Retirado</option>
            </select>
            <span v-if="validate.status.$error" class="text-danger">
                {{ validate.status.$errors[0].$message }}
            </span>
        </div>
        <div class="col-12">
            <router-link :to="{ name: 'personal.index' }" class="btn btn-light  me-2">
                Cancelar
            </router-link>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
    </form>
</template>