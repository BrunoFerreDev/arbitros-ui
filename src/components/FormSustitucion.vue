<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-xl font-semibold mb-4">
      Realizar Sustitución {{ sustituciones.length }} / 5  {{ props.equipo }}
    </h3>

    <form @submit.prevent="handleSubmit" v-if="canMakeSubstitution">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label for="playerOut" class="block text-sm font-medium text-gray-700 mb-1">
            Sale (Titular en cancha)
          </label>
          <select id="playerOut" v-model="selectedPlayerOutId" required
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option :value="null" disabled>Seleccione un jugador</option>
            <option v-for="player in jugadores" :key="player.id" :value="player.id">
              ID JUGADOR: <span class="font-bold text-blue-600">{{ player.id }}</span>
            </option>
          </select>
        </div>

        <div>
          <label for="playerIn" class="block text-sm font-medium text-gray-700 mb-1">
            Entra (Suplente)
          </label>
          <select id="playerIn" v-model="selectedPlayerInId" required
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option :value="null" disabled>Seleccione un jugador</option>
            <option v-for="player in jugadores" :key="player.id" :value="player.id">
              ID JUGADOR: <span class="font-bold text-blue-600">{{ player.id }}</span>
            </option>
          </select>
        </div>

        <div>
          <label for="minute" class="block text-sm font-medium text-gray-700 mb-1">
            Minuto
          </label>
          <input type="number" id="minute" v-model="minute" placeholder="Ej: 65" min="1" max="120" required
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
      </div>

      <div class="text-right mt-6">
        <button type="submit" class="py-2 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Guardar Sustitución
        </button>
      </div>
    </form>

    <div v-else class="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
      <p class="font-bold">Límite alcanzado</p>
      <p>Ya se han realizado las 5 sustituciones permitidas para este equipo.</p>
    </div>
      
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import ListaSustitucion from './ListaSustitucion.vue';

const props = defineProps({
  partidoId: Number,
  jugadores: Array,
  sustituciones: Array,
  equipo: String,
});

// const emit = defineEmits(['addSubstitution']);

const MAX_SUBSTITUTIONS = 5;

// IDs seleccionados en los <select>
const selectedPlayerOutId = ref(null);
const selectedPlayerInId = ref(null);
const minute = ref(null);

// Controla si se muestra el formulario o el mensaje de límite
const canMakeSubstitution = computed(() => {
  return props.sustituciones.length < MAX_SUBSTITUTIONS;
});

function handleSubmit() {
  if (!selectedPlayerOutId.value || !selectedPlayerInId.value || minute.value === null) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  // Buscamos los objetos completos de los jugadores
  const playerOut = props.jugadores.find(p => p.id === selectedPlayerOutId.value);
  const playerIn = props.jugadores.find(p => p.id === selectedPlayerInId.value);

  const substitutionData = {
    minuto: minute.value,
    idJugadorReemplazado: playerOut.id,
    idJugadorReemplazante: playerIn.id,
  };

  axios.post('http://localhost:8080/api/sustituciones/' + props.partidoId + '/guardar', substitutionData)
    .then(response => {
      console.log(response.data);
      alert('Sustitución guardada correctamente');
      closeModal();
      location.reload();
    })
    .catch(error => {
      console.error(error);
    })

  // Enviamos el evento al componente padre (MatchSubstitutions.vue)
  // emit('addSubstitution', substitutionData);

  // Aquí también harías tu llamada a la API (axios.post) para guardar en el backend

  // Limpiamos el formulario
  selectedPlayerOutId.value = null;
  selectedPlayerInId.value = null;
  minute.value = null;
}

</script>