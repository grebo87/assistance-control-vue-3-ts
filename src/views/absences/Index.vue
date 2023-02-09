<script setup lang="ts">
import { storeToRefs } from 'pinia';

import moment from 'moment';
import Table from './Table.vue';

import { usePersonalStore } from '../../stores/personal.store';

const personalStore = usePersonalStore();

const { message, statusRespose } = storeToRefs(personalStore);
</script>

<template>
    <div class="p-4">
        <div class="container">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">

                        <div class="col">
                            <router-link :to="{ name: 'absences.create' }" class="btn btn-primary float-right">
                                <i class="fa fa-plus mr-1"></i>
                                Registrar Inasistencia
                            </router-link>
                        </div>
                    </div>
                    <div v-if="message" :class="statusRespose == true ? 'alert alert-success' : 'alert alert-danger'">
                        {{ message }}
                    </div>
                    <div class="row mb-2">
                        <div class="col">
                            <h2>Registro de Inasistencia del dia {{ moment().format('DD-MM-YYYY') }}</h2>
                        </div>
                    </div>
                </div>
            </section>

            <Table />
        </div>
    </div>
</template>