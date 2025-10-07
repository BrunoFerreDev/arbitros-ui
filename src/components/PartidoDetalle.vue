<template>

  <!-- Tabs principales -->
  <div class="mb-6 border-b border-gray-200">
    <nav class="-mb-px space-x-8 mx-auto flex items-center justify-around">
      <button v-for="tab in tabs" :key="tab.name" @click="selectedTab = tab.name" :class="[
        selectedTab === tab.name
          ? 'border-green-600 text-green-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md'
      ]">
        {{ tab.label }}
      </button>
    </nav>
  </div>

  <!-- Contenido dinámico -->
  <div v-if="selectedTab === 'informe'">
    <section class="bg-white shadow rounded-2xl p-6 mb-6">
      <!-- Información básica -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="text-sm font-medium text-gray-700">Torneo</label>
          <input readonly v-model="partido.torneo" disabled class="w-full p-2 border rounded-lg bg-gray-50" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700">Fecha</label>
          <input readonly v-model="partido.fecha" disabled class="w-full p-2 border rounded-lg bg-gray-50" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700">Hora</label>
          <input readonly v-model="partido.hora" disabled class="w-full p-2 border rounded-lg bg-gray-50" />
        </div>
      </div>

      <!-- Equipos -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <!-- Local -->
        <div class="border rounded-2xl p-4">
          <h2 class="text-lg font-semibold text-gray-800 mb-2 text-center">🏠 Local</h2>
          <p class="text-center text-gray-700 font-medium mb-3">{{ partido.local.nombre }}</p>
          <label class="text-sm text-gray-700">Goles</label>
          <input readonly type="number" v-model="partido.local.goles" class="w-full border p-2 rounded-lg mb-3" />
          <label class="text-sm text-gray-700">Tarjetas Amarillas</label>
          <input readonly type="number" v-model="partido.local.amarillas" class="w-full border p-2 rounded-lg mb-3" />
          <label class="text-sm text-gray-700">Tarjetas Rojas</label>
          <input readonly type="number" v-model="partido.local.rojas" class="w-full border p-2 rounded-lg" />
        </div>

        <!-- Visitante -->
        <div class="border rounded-2xl p-4">
          <h2 class="text-lg font-semibold text-gray-800 mb-2 text-center">🚩 Visitante</h2>
          <p class="text-center text-gray-700 font-medium mb-3">{{ partido.visitante.nombre }}</p>
          <label class="text-sm text-gray-700">Goles</label>
          <input readonly type="number" v-model="partido.visitante.goles" class="w-full border p-2 rounded-lg mb-3" />
          <label class="text-sm text-gray-700">Tarjetas Amarillas</label>
          <input readonly type="number" v-model="partido.visitante.amarillas"
            class="w-full border p-2 rounded-lg mb-3" />
          <label class="text-sm text-gray-700">Tarjetas Rojas</label>
          <input readonly type="number" v-model="partido.visitante.rojas" class="w-full border p-2 rounded-lg" />
        </div>
      </div>
    </section>
    <section class=" bg-white shadow rounded-2xl p-6">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Cargar horarios del partido</h4>
      <section class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <!-- Primer Tiempo -->
        <div>
          <label class="text-sm font-medium text-gray-700">Primer Tiempo:</label>
          <input type="time" v-model="minutos.primerTiempo" class="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700">Minutos adicionales:</label>
          <input type="number" min="0" v-model="minutos.minutosAdicionalesPT" class="w-full p-2 border rounded-lg" />
        </div>

        <!-- Segundo Tiempo -->
        <div>
          <label class="text-sm font-medium text-gray-700">Segundo Tiempo:</label>
          <input type="time" v-model="minutos.segundoTiempo" class="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700">Minutos adicionales:</label>
          <input type="number" min="0" v-model="minutos.minutosAdicionalesST" class="w-full p-2 border rounded-lg" />
        </div>
      </section>

      <div class="mt-4 p-4 bg-gray-100 rounded-lg">
        <p class="text-sm text-gray-800">⏱️ Primer tiempo total: <strong>{{ totalPrimerTiempo }} min</strong></p>
        <p class="text-sm text-gray-800">⏱️ Segundo tiempo total: <strong>{{ totalSegundoTiempo }} min</strong></p>
        <p class="text-lg font-semibold text-gray-900 mt-2">🏁 Total partido: {{ totalPartido }} minutos</p>
      </div>
    </section>
    <!-- Observaciones -->
    <section class="bg-white shadow rounded-2xl p-6 my-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Incidencias y Observaciones</h2>
      <textarea v-model="partido.incidencias" rows="3" class="w-full border p-2 rounded-lg mb-4"
        placeholder="Expulsión del jugador #8 a los 75 minutos..."></textarea>
      <textarea v-model="partido.observaciones" rows="3" class="w-full border p-2 rounded-lg"
        placeholder="Ejemplo: Partido suspendido por lluvia..."></textarea>

      <div class="mt-6 flex justify-end gap-3">
        <button class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg"
          @click="resetearFormulario">
          Limpiar
        </button>
        <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
          @click="enviarInforme">
          Enviar Informe
        </button>
      </div>
    </section>
  </div>

  <!-- Tab de Eventos -->
  <div v-else-if="selectedTab === 'eventos'">
    <EventosPartido />
  </div>

  <!-- Tab de Archivos -->
  <div v-else-if="selectedTab === 'archivos'">
    <ArchivosPartidos />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import EventosPartido from './EventosPartido.vue'
import ArchivosPartidos from './ArchivosPartidos.vue'
const tabs = [
  { name: 'informe', label: 'Informe General' },
  { name: 'eventos', label: 'Goles / Amonestados / Expulsados / Sustituciones' },
  { name: 'archivos', label: 'Archivos / Planillas' },
]

const selectedTab = ref('informe')

const partido = ref({
  torneo: 'Torneo Clausura 2025',
  fecha: '06/10/2025',
  hora: '16:00',
  local: { nombre: 'Club Central', goles: 0, amarillas: 0, rojas: 0 },
  visitante: { nombre: 'Deportivo Norte', goles: 0, amarillas: 0, rojas: 0 },
  incidencias: '',
  observaciones: '',
})


const enviarInforme = () => {
  console.log('Informe enviado:', partido.value)
  alert('Informe del partido enviado correctamente ✅')
}

const resetearFormulario = () => {
  partido.value.local = { nombre: partido.value.local.nombre, goles: 0, amarillas: 0, rojas: 0 }
  partido.value.visitante = { nombre: partido.value.visitante.nombre, goles: 0, amarillas: 0, rojas: 0 }
  partido.value.incidencias = ''
  partido.value.observaciones = ''
}

const minutos = ref({
  primerTiempo: partido.value.hora,
  minutosAdicionalesPT: 0,
  segundoTiempo: "", // se va a calcular automáticamente
  minutosAdicionalesST: 0
});

const DURACION_TIEMPO = 45; // minutos por tiempo
const DESCANSO = 15; // minutos de descanso

// Calcula la hora de inicio del segundo tiempo automáticamente
const calcularHoraSegundoTiempo = () => {
  if (!partido.value.hora) return;

  const [horas, minutosStr] = partido.value.hora.split(":").map(Number);
  const base = new Date();
  base.setHours(horas, minutosStr, 0, 0);

  // sumamos 45 + minutos adicionales + descanso
  const totalPrimerTiempo =
    DURACION_TIEMPO + Number(minutos.value.minutosAdicionalesPT || 0) + DESCANSO;

  base.setMinutes(base.getMinutes() + totalPrimerTiempo);

  // devolvemos formato HH:mm
  const hh = base.getHours().toString().padStart(2, "0");
  const mm = base.getMinutes().toString().padStart(2, "0");

  minutos.value.segundoTiempo = `${hh}:${mm}`;
};

// Observa cambios en minutos adicionales o la hora del partido
watch(
  () => [partido.value.hora, minutos.value.minutosAdicionalesPT],
  calcularHoraSegundoTiempo,
  { immediate: true }
);

// Totales de minutos jugados
const totalPrimerTiempo = computed(() => {
  return DURACION_TIEMPO + Number(minutos.value.minutosAdicionalesPT || 0);
});
const totalSegundoTiempo = computed(() => {
  return DURACION_TIEMPO + Number(minutos.value.minutosAdicionalesST || 0);
});
const totalPartido = computed(() => {
  return totalPrimerTiempo.value + totalSegundoTiempo.value;
});
</script>
