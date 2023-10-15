<template>
    <div class="container">
        <div class="row m-b-sm">
            <div class="col">
                <h2> {{ title }}</h2>
            </div>
            <div class="col">
                <button type="button" class="btn btn-warning btn-rounded m-1" data-bs-toggle="modal" data-bs-target="#addModal"> <i class="bi bi-plus"></i></button>
                <button type="button" class="btn btn-success btn-rounded"> <i class="bi bi-check-all"></i></button>
            </div>
        </div>

        <div class="row rounded-3">
            <div class="col">
                <table class="table table-hover table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                </div>
                            </th>
                            <th scope="col">Tarea</th>
                            <th scope="col">Detalle</th>
                            <th scope="col">Fecha de creación</th>
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in tasksList" :key="item.id">
                            <th scope="row">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                </div>
                            </th>
                            <td>{{ item.title }}</td>
                            <td>{{ item.detail }}</td>
                            <td>{{ item.create_at }}</td>
                            <td>Active</td>
                            <td> 
                                <button type="button" class="btn btn-outline-secondary m-1"><i class="bi bi-pen"></i></button> 
                                <button type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        
                        <!-- <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>Active</td>
                            <td> 
                                <button type="button" class="btn btn-outline-secondary mx-auto"><i class="bi bi-pen"></i></button> 
                                <button type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            <td>Active</td>
                            <td> 
                                <button type="button" class="btn btn-outline-secondary mx-auto"><i class="bi bi-pen"></i></button> 
                                <button type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                            </td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar Tarea</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue';
    export default {
        setup() {
            const title = 'Actividades de Mi Día';
            const tasksList = ref([]);

            const getAllTasks = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/task');
                    const data = await response.json();
                    tasksList.value = data.data;
                } catch (error) {
                    console.error('Error al obtener las tareas:', error);
                }
            };

            onMounted(() => {
                getAllTasks();
            });

            return {
                title,
                tasksList
            };
        }
    };
</script>