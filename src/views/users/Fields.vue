<script setup lang='ts'>
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';


import { useUserStore } from '../../stores/user.store';
import router from '../../routes';

const userStore = useUserStore();

const { errors, statusRespose } = storeToRefs(userStore);

const form = reactive({
    name: '',
    email: ''
});

const rules = {
    name: { reuired: helpers.withMessage('El nombre es requerido.', required) },
    email: { reuired: helpers.withMessage('El Correo es requerido.', required) }
};

const validate = useVuelidate(rules, form);

const onSubmit = async () => {
    validate.value.$touch();

    if (validate.value.$invalid) return;

    await userStore.store(form);

    if (statusRespose.value == true) {
        router.push({ name: 'users.index' });
    }
}

</script>

<template>
    <form class="row g-3 " @submit.prevent="onSubmit">
        <div v-if="errors.length > 0" class="alert alert-danger">
            <ul>
                <li v-for="error in errors">{{ error }}</li>
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
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" v-model="form.email">
            <span v-if="validate.email.$error" class="text-danger">
                {{ validate.email.$errors[0].$message }}
            </span>
        </div>

        <div class="col-12">
            <router-link :to="{ name: 'users.index' }" class="btn btn-light  me-2">
                Cancelar
            </router-link>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
    </form>
</template>