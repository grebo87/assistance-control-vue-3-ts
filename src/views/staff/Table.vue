<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Personal } from '../../models/Personal';
import router from '../../routes';
import { usePersonalStore } from '../../stores/personal.store';

const personal = ref<Personal[]>([]);
const personalStore = usePersonalStore();


onMounted(() => {
    personalStore.index();

    personal.value = personalStore.personal;
});

const edit = (id: string) => {
    console.log(id);
    router.push({ name: 'personal.edit', params: { id: id } });
}

</script>

<template>
    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Cedula</th>
                    <th scope="col">Código personal</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="perso in personal" :key="perso.code">
                    <td>{{ perso.name }}</td>
                    <td>{{ perso.identification_number }}</td>
                    <td>{{ perso.code }}</td>
                    <td>
                        <span class='btn btn-primary btn-sm' @click="edit(perso.code)">
                            <fa icon="edit" />
                        </span>
                        <a href="#" class='btn btn-danger btn-sm'
                            onclick="if(confirm('&iquest;Esta seguro que desea eliminar a esta persona?')) return true;  else return false;">
                            <fa icon="trash" />
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>