<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
import { usePersonalStore } from '../../stores/personal.store';
import router from '../../routes';
import { useRoute } from 'vue-router';

const personalStore = usePersonalStore();

const { personals, errors, statusRespose } = storeToRefs(personalStore);
const route = useRoute();
const id = route.params.id;





onBeforeMount(async () => {
    const res = await personalStore.findAbsenceById(id);
    form.id = res.personal_id;
    form.observation = res.observation;
    form.type = res.type;
});

const disabledBtn = ref(false);

const rules = {
    id: { reuired: helpers.withMessage('La cedula es requerida.', required) },
    type: { reuired: helpers.withMessage('El tipo de inasistencia es requerida.', required) },
};

const form = reactive({
    id: '',
    type: '',
    observation: ''
});
const validate = useVuelidate(rules, form);

onBeforeMount(() => {
    personalStore.index();
});

const onSubmit = async () => {
    validate.value.$touch();

    if (validate.value.$invalid) return;

    await personalStore.updateAbsence(form.id, form);

    if (statusRespose.value == true) {
        router.push({ name: 'absences.index' });
    }
};
</script>

<template>
    <form class="row g-3 " @submit.prevent="onSubmit">
        <div v-if="errors.length > 0" class="alert alert-danger">
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>
        <div class="col-md-6">
            <label for="id" class="form-label">Cedula</label>
            <select id="id" class="form-select" name="id" v-model="form.id" disabled>
                <option value=""> Elige una opción </option>
                <option v-for="personal in personals" :key="personal.id"  :value="personal.id" :selected="personal.id == form.id">{{
                    personal.identification_number
                }}</option>
            </select>
            <span v-if="validate.id.$error" class="text-danger">
                {{ validate.id.$errors[0].$message }}
            </span>
        </div>
        <div class="col-md-6">
            <label for="type" class="form-label">Inasistencia Por</label>
            <select id="type" class="form-select" name="type" v-model="form.type">
                <option selected value=""> Elige una opción </option>
                <option value="Inasistencia Injustificada">Inasistencia Injustificada</option>
                <option value="Retraso Injustificado">Retraso Injustificado</option>
                <option value="Reposo Medico">Reposo Medico</option>
                <option value="Observacion">Observacion</option>
            </select>
            <span v-if="validate.type.$error" class="text-danger">
                {{ validate.type.$errors[0].$message }}
            </span>
        </div>

        <div class="col-md-6">
            <label for="observation" class="form-label">Observacíon</label>
            <textarea id="observation" class="form-control" rows="3" name="observation"
                v-model="form.observation"></textarea>
            <!-- <span v-if="validate.observation.$error" class="text-danger">
                {{ validate.observation.$errors[0].$message }}
            </span> -->
        </div>
        <div class="col-12">
            <router-link :to="{ name: 'absences.index' }" class="btn btn-light  me-2">
                Cancelar
            </router-link>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
    </form>
</template>