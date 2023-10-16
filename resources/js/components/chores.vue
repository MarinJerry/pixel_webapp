<template>
    <div class="container">
        <div class="row mb-sm">
            <div class="col-lg-6">
                <h3> <i class="bi bi-calendar"></i> {{ title }} </h3>
            </div>
            <div class="col-lg-6 mb-sm">
                <button type="button" class="btn btn-outline-success btn-rounded-circle m-2" @click="viewCompletedTask"> <i class="bi bi-check-all"> Tareas completadas</i></button>
                <button type="button" class="btn btn-outline-info btn-rounded-circle m-2" @click="viewCompletedTask"> <i class="bi bi-check-all"> Tareas pendientes</i></button>
                <button type="button" class="btn btn-warning btn-rounded m-2" data-bs-toggle="modal" data-bs-target="#addModal"> <i class="bi bi-plus"> Nueva Tarea</i></button>
            </div>
        </div>

        <div class="row rounded-5 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="col table-responsive">
                <table class="table table-hover table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">
                                <i class="bi bi-check-all"></i>
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
                                <div class="form-check" v-show="item.enabled === 0">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" @change="completeTask(item.id)">
                                </div>
                            </th>
                            <td>{{ item.title }}</td>
                            <td>{{ item.detail }}</td>
                            <td>{{ item.create_at }}</td>
                            <td :class="{'text-primary': item.enabled === 0, 'text-success': item.enabled === 1}">{{ (item.enabled === 0) ? "Pendiente": "Terminada" }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal Add-->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar Tarea</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Tarea</label>
                    <input type="text" v-model="state.data.title" class="form-control" id="exampleFormControlInput1" placeholder="Escribe titulo de la tarea o quehacer">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Detalle de tarea</label>
                    <input type="text" v-model="state.data.detail" class="form-control" id="exampleFormControlInput1" placeholder="Detalle la tarea a realizar">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary pull-left" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" @click="saveData" data-bs-dismiss="modal">Guardar</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref, onMounted } from 'vue';

    export default {
        setup() {
            const title = 'Actividades de Mi Día';
            const tasksList = ref([]);
            const tasksListAll = ref([]);
            const state = reactive({
                data: {
                    title: '',
                    detail: '',
                    enabled: false
                },
            });

            const getAllTasks = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/task');
                    const data = await response.json();
                    tasksListAll.value = data.data;
                    tasksList.value = data.data.filter(item => item.enabled === 0);
                } catch (error) {
                    console.error('Error al obtener las tareas:', error);
                }
            };

            const saveData = () => {
                const title = state.data.title;
                const detail = state.data.detail;

                axios.post('http://localhost:3000/api/task', {
                    data: state.data,
                })
                .then(response => {
                    getAllTasks();
                    console.log('Data guardada exitosamente.');
                })
                .catch(error => {
                    console.error('Error al guardar los datos:', error);
                });
            };

            const completeTask = (id) => {
                state.data.enabled = 1;
                axios.put(`http://localhost:3000/api/task/complete/${id}`, {
                    data: state.data,
                })
                .then(response => {
                    getAllTasks();
                    console.log('Tarea completada exitosamente.');
                })
                .catch(error => {
                    console.error('Error al guardar los datos:', error);
                });
            };

            const viewCompletedTask = () => {
                let taskType = (tasksList.value.length > 0 && tasksList.value[0].enabled === 1) ? 0 : 1;
                tasksList.value = tasksListAll.value.filter(item => item.enabled === taskType);
            }

            onMounted(() => {
                getAllTasks();
            });

            return {
                title,
                tasksList,
                tasksListAll,
                state,
                saveData,
                completeTask,
                viewCompletedTask
            };
        },
    };
</script>