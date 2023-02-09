<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import moment from 'moment';
import router from '../../routes';
import { usePersonalStore } from '../../stores/personal.store';

const personalStore = usePersonalStore();

const { personals } = storeToRefs(personalStore);

onMounted(async () => {
    await personalStore.getPersonalWithAbsence();
});

const edit = (id: string) => {
    router.push({ name: 'absences.edit', params: { id: id } });
}

const destroy = async (id: string) => {
    const confir = confirm('¿Esta seguro que desea eliminar la inasistencia?');
    if (confir == true) {
       await personalStore.deleteAbsence(id);
    //    await personalStore.getPersonalWithAbsence();
    }
};


</script>

<template>
    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Cedula</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Inasistencia Por</th>
                    <th scope="col">Observacíon</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="perso in personals" :key="perso.id">
                    <td>{{ perso.code }} </td>
                    <td>{{ perso.identification_number }}</td>
                    <td>{{ perso.name }}</td>
                    <td>
                        <p v-if="perso.absence">
                            {{ perso.absence.type }}
                        </p>
                    </td>
                    <td>
                        <p v-if="perso.absence">
                            {{ perso.absence.observation }}
                        </p>
                    </td>
                    <td>
                        <span class='btn btn-primary btn-sm' @click="edit(perso.id)" v-if="perso.absence">
                            <fa icon="edit" />
                        </span>
                        <a href="#" class='btn btn-danger btn-sm' @click="destroy(perso.id)" v-if="perso.absence">
                            <fa icon="trash" />
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>