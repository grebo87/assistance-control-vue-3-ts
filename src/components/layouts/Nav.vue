<script setup lang="ts">
import $ from 'jquery';

$(() => {
    $('.dropdown-toggle').click(() => {
        $('.submenu').slideToggle();
    });
});

</script>

<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3 sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <router-link :to="{ name: 'dashboard' }" class="nav-link active">
                        <span data-feather="home" class="align-text-bottom"></span>
                        Dashboard
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'personal.index' }" class="nav-link">
                        <span data-feather="users" class="align-text-bottom"></span>
                        Personal
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'assistance.index' }" class="nav-link">
                        <span data-feather="check-circle" class="align-text-bottom"></span>
                        Asistencia
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'absences.index' }" class="nav-link">
                        <span data-feather="slash" class="align-text-bottom"></span>
                        Inasistencias
                    </router-link>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link dropdown-toggle">
                        <span data-feather="folder" class="align-text-bottom"></span>
                        Autorizaciones
                    </a>

                    <ul class="submenu" style="display: none;">
                        <li class="nav-item">
                            <a href="#" class="nav-link">Permisos</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">Vacaciones</a>
                        </li>
                    </ul>
                </li> -->
                <li class="nav-item">
                    <router-link :to="{ name: 'users.index' }" class="nav-link">
                        <span data-feather="users" class="align-text-bottom"></span>
                        Usuarios
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
.nav .submenu .nav-item a {
    padding-left: 10px;
}

.nav .submenu li {
    list-style: none;
}
</style>