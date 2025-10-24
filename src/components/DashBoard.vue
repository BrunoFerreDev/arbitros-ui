<template>
  <!-- Grid Principal -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Tarjetas Resumen -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Próximos Partidos -->
      <section class="bg-white shadow rounded-2xl p-5">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-xl font-semibold text-gray-800">Próximos Partidos</h2>
        </div>

        <ul class="divide-y divide-gray-200">
          <li class="py-3 flex justify-between items-center">
            <div>
              <p class="font-medium text-gray-700">
                {{ local.nombre }} vs {{ visitante.nombre }}
              </p>
              <p class="text-sm text-gray-500">
                {{ partido.fechaCalendario }}
              </p>
            </div>
            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Asignado</span>
            <router-link :to="'/partido/' + partido.idPartido" class="text-sm font-medium text-gray-600">Ir al
              partido</router-link>
          </li>
        </ul>
      </section>

      <!-- Últimos Partidos Dirigidos -->
      <!-- <section class="bg-white shadow rounded-2xl p-5">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-xl font-semibold text-gray-800">
            Últimos Partidos Dirigidos
          </h2>
          <button class="text-sm text-green-600 hover:underline">
            Ver historial
          </button>
        </div>

        <ul class="divide-y divide-gray-200">
          <div>
            <p class="font-medium text-gray-700">
              {{ local.nombre }} vs {{ visitante.nombre }}
            </p>
            <p class="text-sm text-gray-500">{{ partido.fechaCalendario }}</p>
          </div>
          <span class="text-sm font-medium text-gray-600">Resultado: {{ resultado ? resultado : 'No hay resultado'
            }}</span>
        </ul>
      </section> -->
    </div>

    <!-- Columna lateral -->
    <div class="space-y-6">
      <!-- Estadísticas -->
      <section class="bg-white shadow rounded-2xl p-5">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Mis Estadísticas
        </h2>
        <ul class="space-y-3">
          <li class="flex justify-between text-gray-700">
            <span>Partidos dirigidos</span>
            <strong>{{ estadisticas.partidos }}</strong>
          </li>
          <li class="flex justify-between text-gray-700">
            <span>Tarjetas mostradas</span>
            <strong>{{ estadisticas.tarjetas }}</strong>
          </li>
          <li class="flex justify-between text-gray-700">
            <span>Promedio de goles</span>
            <strong>{{ estadisticas.promedioGoles }}</strong>
          </li>
        </ul>
      </section>

      <!-- Notificaciones -->
      <section class="bg-white shadow rounded-2xl p-5">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Notificaciones</h2>
        <ul class="space-y-2">
          <li v-for="(notif, i) in notificaciones" :key="i"
            class="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <p class="text-sm text-gray-700">{{ notif.mensaje }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ notif.fecha }}</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

const estadisticas = ref({
  partidos: 45,
  tarjetas: 130,
  promedioGoles: 2.4,
});

const notificaciones = ref([
  { mensaje: "Nueva designación para el Torneo Clausura", fecha: "05/10/2025" },
  {
    mensaje: "Cambio de horario en el partido Club A vs Club B",
    fecha: "04/10/2025",
  },
]);

const designacion = ref({})
const partido = ref({})
const local = ref({})
const visitante = ref({})
const torneo = ref({})
const traerDesignacion = () => {
  axios.get('http://localhost:8080/api/arbitros/designaciones?idArbitro=1&estado=PENDIENTE').then((response) => {
    const datos = response.data;
    designacion.value = {
      idDesignacion: datos.idDesignacion,
      rol: datos.rol
    };
    partido.value = {
      idPartido: datos.partido.idPartido,
      fechaTorneo: datos.partido.fechaTorneo,
      fechaCalendario: datos.partido.fechaCalendario,
      estado: datos.partido.estado,
      local: datos.partido.local,
      visitante: datos.partido.visitante,
      torneo: datos.partido.torneo,
    }
    torneo.value = {
      id: torneo.id,
      nombre: torneo.nombre,
      temporada: torneo.temporada,
      categoria: torneo.categoria,
      tipo: torneo.tipo,
      fechaInicio: torneo.fechaInicio,
      fechaFin: torneo.fechaFin,
      estado: torneo.estado,
      reglamentoUrl: torneo.reglamentoUrl,
      codigoTorneo: torneo.codigoTorneo
    }
    const dataLocal = partido.value.local;
    const dataVisita = partido.value.visitante;
    local.value = dataLocal
    visitante.value = dataVisita

    console.log(partido.value)
  }).catch((error) => {
    console.log(error)
  })
}
onMounted(() => {
  traerDesignacion()
});
</script>

<style scoped></style>
