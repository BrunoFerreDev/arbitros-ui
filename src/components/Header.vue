<template>
  <!-- Encabezado -->
  <header class="mb-6 flex items-center justify-start">
    <h1 class="text-3xl font-bold text-gray-800">Panel del Árbitro</h1>
    <p class="text-gray-600 mx-auto">Bienvenido, {{ arbitro.nombre }}</p>
    <ul>
      <li>
        <router-link to="/" class="text-sm text-gray-600 hover:underline"
          >Incio</router-link
        >
      </li>
      <li>
        <router-link to="/partido/1" class="text-sm text-gray-600 hover:underline"
          >Mi perfil</router-link
        >
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    arbitro: {
      type: Object,
      required: true,
    },
  },
};
</script>
