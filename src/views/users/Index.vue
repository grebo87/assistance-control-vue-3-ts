<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import Table from './Table.vue';
import { useUserStore } from '../../stores/user.store'; 

const userStores = useUserStore();

const { message, statusRespose } = storeToRefs(userStores);
</script>

<template>
    <div class="p-4">
        <div class="container">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">

                        <div class="col">
                            <router-link :to="{ name: 'users.create' }" class="btn btn-primary float-right">
                                <i class="fa fa-plus mr-1"></i>
                                Nuevo Usuario
                            </router-link>
                        </div>
                    </div>
                    <div v-if="message" :class="statusRespose == true ? 'alert alert-success' : 'alert alert-danger'">
                        {{ message }}
                    </div>
                </div>
            </section>

            <Table />
        </div>
    </div>
</template>