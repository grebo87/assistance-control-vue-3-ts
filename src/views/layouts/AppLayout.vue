<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from '../../components/layouts/Header.vue';
import Nav from '../../components/layouts/Nav.vue';
import TitlePage from '../../components/layouts/TitlePage.vue';



const currentRute = useRoute();

</script>
<template>
    <Header />
    <div class="container-fluid">
        <div class="row">
            <Nav />
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <TitlePage :title="currentRute.path" />
                <router-view />
            </main>
        </div>
    </div>
</template>