<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, required, email } from '@vuelidate/validators';
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../stores/auth.store';

const authStore = useAuthStore();

const { message, errors } = storeToRefs(authStore);

const form = reactive({
    email: '',
    password: '',
    remember_me: false
});

const rules = {
    password: { reuired: helpers.withMessage('La contaseña o password es requerida.', required) },
    email: { reuired: helpers.withMessage('El email o correo es requerido.', required), email: helpers.withMessage('El valor no es una dirección de correo electrónico válida', email) },
    // remember_me: { reuired: helpers.withMessage('El email o correo es requerido.', required) },
};

const validate = useVuelidate(rules, form);

const onSubmit = () => {
    validate.value.$touch();

    if (validate.value.$invalid) return;

    authStore.login(form.email, form.password);
};
</script>

<template>
    <main class="form-signin w-100 m-auto">
        <form @submit.prevent="onSubmit">
            <img class="mb-4" style="margin-left: 90px;" src="../../../public/assets/empleados.png" alt="" width="100"
                height="100">
            <h1 class="h3 mb-3 fw-normal">Ingreso al Sistema</h1>
            <div v-if="Object.entries(errors).length > 0" class="alert alert-danger">
                <ul>
                    <template v-for="error in errors">
                        <li v-for="message_error in error">
                            {{ message_error }}
                        </li>
                    </template>
                </ul>
            </div>

            <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                    v-model="form.email">
                <label for="floatingInput">Email</label>
                <span v-if="validate.email.$error" class="text-danger">
                    {{ validate.email.$errors[0].$message }}
                </span>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                    v-model="form.password">
                <label for="floatingPassword">Password</label>
                <span v-if="validate.password.$error" class="text-danger">
                    {{ validate.password.$errors[0].$message }}
                </span>
            </div>

            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me" v-model="form.remember_me"> Recordar Contraseña
                </label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Iniciar Sesión</button>
            <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p> -->
        </form>
    </main>

</template>

<style scoped>
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}

.b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
}

.bi {
    vertical-align: -.125em;
    fill: currentColor;
}

.nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
}

.nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}

html,
body {
    height: 100%;
}

body {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.form-signin {
    max-width: 330px;
    padding: 15px;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>