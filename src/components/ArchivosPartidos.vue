<template>
  <section class="bg-white shadow rounded-2xl p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Archivos y Planillas del Partido</h2>

    <p class="text-gray-600 mb-6">
      Suba las planillas e informes correspondientes (hasta 2 archivos por sección).
    </p>

    <!-- PLANILLAS LOCAL -->
    <UploaderSeccion :titulo="'📘 Planillas del equipo Local: ' + local" color="blue" v-model="planillasLocal" />

    <!-- PLANILLAS VISITA -->
    <UploaderSeccion :titulo="'📕 Planillas del equipo Visitante: ' + visitante" color="red" v-model="planillasVisita" />

    <!-- INFORME DEL PARTIDO -->
    <UploaderSeccion titulo="📝 Informe del Partido" color="green" v-model="informePartido" />

    <div class="mt-8 flex justify-end">
      <button @click="enviarArchivos"
        class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
        Enviar Archivos
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import UploaderSeccion from './UploaderSeccion.vue'
const planillasLocal = ref([])
const planillasVisita = ref([])
const informePartido = ref([])
defineProps({
  local: {
    type: String,
    required: true,
  },
  visitante: {
    type: String,
    required: true,
  },
})
const enviarArchivos = () => {
  const total = {
    local: planillasLocal.value,
    visitante: planillasVisita.value,
    informe: informePartido.value,
  }
  console.log('Archivos cargados:', total)
  alert('Archivos cargados correctamente ✅')
}
</script>
