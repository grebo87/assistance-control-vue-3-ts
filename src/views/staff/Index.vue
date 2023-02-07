<script setup lang="ts">
import Table from './Table.vue';
</script>

<template>
    <div class="p-4">
        <div class="container">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col">
                            <h2>Lista de Personal</h2>
                        </div>
                        <div class="col">
                            <router-link :to="{ name: 'personal.create' }" class="btn btn-primary float-right">
                                <i class="fa fa-plus mr-1"></i>
                                Agregar
                            </router-link>
                        </div>
                    </div>
                </div>
            </section>

            <Table />
        </div>
    </div>
</template>

<style scoped>

</style>