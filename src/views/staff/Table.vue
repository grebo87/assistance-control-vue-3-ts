<script setup lang="ts">
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
                <tr>
                    <td>Gregorio Boada</td>
                    <td>18414472</td>
                    <td>5702347</td>
                    <td>
                       
                        <span data-feather="file-text" ></span>
                        <a href="#" class='btn btn-primary btn-sm'>
                            <fa icon="edit" />
                        </a>
                        <a href="#" class='btn btn-danger btn-sm' onclick="if(confirm('&iquest;Esta seguro que desea eliminar a esta persona?')) return true;  else return false;">
                            <fa icon="trash" />
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>