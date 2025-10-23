<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">Sustituciones Realizadas</h3>
    <div v-if="sustituciones.length === 0" class="text-gray-500">
      Aún no se han cargado sustituciones.
    </div>
    <ul v-else class="space-y-3">
      <li v-for="sub in sustituciones" :key="sub.id"
        class="flex items-center justify-between p-3 bg-gray-50 rounded border">
        <div>
          <span class="font-bold text-green-600">ENTRA:</span> {{ sub.jugadorReemplazado }}
          <br />
          <span class="font-bold text-red-600">SALE:</span> {{ sub.jugadorReemplazante }}
        </div>
        <div class="text-lg font-semibold text-gray-800">
          Minuto {{ sub.minuto }}'
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>

const props = defineProps({
  sustituciones: Array,
});



</script>