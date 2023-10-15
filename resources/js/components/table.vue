<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Email</th>
          <!-- Agrega más columnas según tus necesidades -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
          <td>{{ index + 1 }}</td>
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.email }}</td>
          <!-- Muestra más datos según tus necesidades -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
    props: {
        usuarios: Array, // Suponiendo que usuarios es un array de objetos con propiedades nombre y email
    },
    };
</script>

<style scoped>
/* Estilos específicos del componente si es necesario */
</style>
