<script setup lang="ts">
import { RouteMeta } from 'vue-router';

defineProps<{
  title: string;
}>();
</script>

<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom text-transform: capitalize;">
        <h1 class="h2">{{ title?.toString().toLowerCase() }}</h1>
    </div>
</template>