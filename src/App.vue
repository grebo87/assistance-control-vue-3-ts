<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth.store';
import AppLayout from './views/layouts/AppLayout.vue';
import AuthLayout from './views/layouts/AuthLayout.vue';
import AssistanceLayout from './views/layouts/AssistanceLayout.vue';

const authStore = useAuthStore();

const {loggedIn, user} = storeToRefs(authStore);
const currentRute = useRoute();
</script>

<template>
  
  <AppLayout v-if="loggedIn == true"/>

  <AuthLayout v-if="loggedIn == false && currentRute.name == 'login'"/>
  <AssistanceLayout v-if="loggedIn == false && currentRute.name != 'login'"/>

</template>

<style scoped>
</style>
