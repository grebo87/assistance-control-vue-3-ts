<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import router from '../../routes';
import { useUserStore } from '../../stores/user.store';

const user_id = localStorage.getItem('user_id');

const userStore = useUserStore();

const { users } = storeToRefs(userStore);

onMounted(async () => {
    await userStore.getAll();
});

const edit = (id: string) => {
    router.push({ name: 'users.edit', params: { id: id } });
};

const destroy = async (id: string) => {
    const confir = confirm('¿Esta seguro que desea eliminar al usuario?');
    if (confir == true) {
        await userStore.delete(id);
        
    }
};



</script>

<template>
    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }} </td>
                    <td>{{ user.email }}</td>
                    <td>
                        <span class='btn btn-primary btn-sm' @click="edit(user.id)">
                            <fa icon="edit" />
                        </span>
                        <button type="button" class='btn btn-danger btn-sm' @click="destroy(user.id)"
                            v-if="user.id != user_id">
                            <fa icon="trash" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>