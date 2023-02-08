<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import moment from 'moment';
import router from '../../routes';
import { usePersonalStore } from '../../stores/personal.store';

const personalStore = usePersonalStore();

const { personals } = storeToRefs(personalStore);

onMounted(() => {
    personalStore.getPersonalWithAssistance();
});

const markStartTime = (id: string) => {
    const confir = confirm('¿Esta seguro que quiere registrar la entrada?');
    if (confir == true) {
        personalStore.markStartTime(id);
    }
}

const markTimeOf = (id: string) => {
    const confir = confirm('¿Esta seguro que quiere registrar la salida?');
    if (confir == true) {
        personalStore.markTimeOf(id);
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
                    <th scope="col">Entrada</th>
                    <th scope="col">Salida</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="perso in personals" :key="perso.id">
                    <td>{{ perso.code }} </td>
                    <td>{{ perso.identification_number }}</td>
                    <td>{{ perso.name }}</td>
                    <td>
                        <template v-if="perso.assistance">
                            {{ moment(perso.assistance.start_time).format('hh:mm A') }}
                        </template>
                        <template v-else>
                            <button type="button" @click="markStartTime(perso.id)" class="btn btn-primary btn-sm">
                                <fa icon="check-circle" />
                            </button>
                        </template>
                    </td>
                    <td>
                        <template v-if="perso.assistance">
                            <template v-if="perso.assistance.time_of != null">
                                {{ moment(perso.assistance.time_of).format('hh:mm A') }}
                            </template>
                            <template v-else>
                                <button type="button" @click="markTimeOf(perso.id)" class="btn btn-secondary btn-sm" :disabled="!perso.assistance">
                                    <fa icon="check-circle" />
                                </button>
                            </template>

                        </template>
                        <template v-else>
                            <button type="button" @click="markTimeOf(perso.id)" class="btn btn-secondary btn-sm" :disabled="!perso.assistance">
                                <fa icon="check-circle" />
                            </button>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>