<template>
    <div class="flex justify-center gap-4">
        <button v-for="tab in tabs" :key="tab.name" @click="selectedTab = tab.name" :class="[
            selectedTab === tab.name
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md'
        ]">
            {{ tab.label }}
        </button>
    </div>
    <div class="p-6 bg-gray-100 min-h-screen font-sans" v-if="selectedTab === 'eventos'">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
            Ficha del Partido
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div class="bg-white p-4 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold mb-4 text-blue-700 border-b pb-2">
                    Equipo : {{ local }}
                </h2>
                <table class="w-full text-left">
                    <thead>
                        <tr class="border-b">
                            <th class="p-2 w-1/4">N°</th>
                            <th class="p-2">Nombre del Jugador</th>
                            <th class="p-2">Ficha/DNI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(player, index) in teamLocal" :key="player.id" @click="selectPlayer(player, 'local')"
                            class="hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                            <td class="p-3 font-medium">{{ index + 1 }}</td>
                            <td class="p-3">{{ player.nombre + ' ' + player.apellido }}</td>
                            <td class="p-3">{{ player.dni }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold mb-4 text-red-700 border-b pb-2">
                    Equipo : {{ visitante }}
                </h2>
                <table class="w-full text-left">
                    <thead>
                        <tr class="border-b">
                            <th class="p-2 w-1/4">N°</th>
                            <th class="p-2">Nombre del Jugador</th>
                            <th class="p-2">Ficha/DNI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(player, index) in teamVisitante" :key="player.id"
                            @click="selectPlayer(player, 'visitante')"
                            class="hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                            <td class="p-3 font-medium">{{ index + 1 }}</td>
                            <td class="p-3">{{ player.nombre + ' ' + player.apellido }}</td>
                            <td class="p-3">{{ player.dni }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="selectedPlayer"
            class="fixed inset-0 backdrop-blur-md bg-opacity-30 flex items-center justify-center z-50 p-4">
            <div class="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md border-1">
                <h2 class="text-2xl font-bold mb-4">
                    Cargar Evento
                </h2>
                <p class="text-lg mb-4">
                    Jugador: <span class="font-semibold">{{ selectedPlayer.nombre + ' ' + selectedPlayer.apellido }} ({{
                        selectedPlayerTeam }})</span>
                </p>

                <form @submit.prevent="saveEvent()" class="flex flex-col justify-start gap-5">
                    <div>
                        <label for="eventType" class="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Evento
                        </label>
                        <select id="eventType" v-model="newEvent.tipo"
                            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="Gol">Gol</option>
                            <option value="Amonestación">Amonestación</option>
                            <option value="Expulsión">Expulsión</option>
                        </select>
                    </div>
                    <div>
                        <label for="eventMinute" class="block text-sm font-medium text-gray-700 mb-1">
                            Minuto (ej: 45)
                        </label>
                        <input type="number" id="eventMinute" v-model="newEvent.minuto" placeholder="1" min="1"
                            max="120" required
                            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div v-if="newEvent.tipo === 'Amonestación'">
                        <label for="detalle">Motivo</label>
                        <select name="detalle" id="detalle" v-model="newEvent.detalleExtra"
                            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="Retrasar la reanudacion de juego">Retrasar la reanudacion de juego</option>
                            <option value="Desaprobar con palabras o acciones">Desaprobar con palabras o acciones
                            </option>
                            <option value="Conducta antideportiva">Conducta antideportiva</option>
                            <option value="Juego brusco comun">Juego brusco comun</option>
                        </select>

                    </div>
                    <div v-if="newEvent.tipo === 'Expulsión'">
                        <label for="exp">Motivo</label>
                        <select name="exp" id="exp" v-model="newEvent.detalleExtra"
                            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="Juego brusco grave">Juego brusco grave</option>
                            <option value="Evitar un gol con la mano">Evitar un gol con la mano</option>
                            <option value="Conducta violenta">Conducta violenta</option>
                            <option value="Lenguaje grosero">Lenguaje grosero</option>
                            <option value="Doble amonestación">Doble amonestación</option>
                        </select>
                    </div>
                    <div v-if="newEvent.tipo === 'Expulsión'">
                        <label for="detalle" class="block font-medium text-gray-700 mb-1">Informe</label>
                        <input type="text" id="detalle" v-model="newEvent.detalle"
                            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div class="flex justify-end gap-3">
                        <button type="button" @click="closeModal"
                            class="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                            Cancelar
                        </button>
                        <button type="submit" class="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Guardar Evento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div v-else-if="selectedTab === 'sustituciones'">
        <PartidoSustitucion :partidoId="partido" :local="local" :visitante="visitante" :idClubLocal="idClubLocal"
            :idClubVisitante="idClubVisitante" :teamLocal="teamLocal" :teamVisitante="teamVisitante" />
    </div>
    <div v-else-if="selectedTab === 'eventos_cargados'">
        <TablaEventos :eventosCargados="eventosCargados" />
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import PartidoSustitucion from './PartidoSustitucion.vue';
import TablaEventos from './TablaEventos.vue';

const props = defineProps({
    partido: Number,
    local: String,
    visitante: String,
    idClubLocal: Number,
    idClubVisitante: Number,
});

const tabs = [
    { name: 'eventos', label: 'Eventos' },
    { name: 'sustituciones', label: 'Sustituciones' },
    { name: 'eventos_cargados', label: 'Eventos Cargados' },
]
const selectedTab = ref('eventos')

const eventosCargados = ref([])

const teamLocal = ref([
    {
        nombre: '',
        apellido: '',
        dni: '',
    },
]);

const teamVisitante = ref([
    {
        nombre: '',
        apellido: '',
        dni: '',
    },
]);

const selectedPlayer = ref(null);

const selectedPlayerTeam = ref(''); // 'local' o 'visitante'

let formatDni = new Intl.NumberFormat('es-AR', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const newEvent = ref({
    minuto: 1,
    tipo: 'Gol',
    detalleExtra: '',
    partido: props.partido,
    jugador: null,
    detalle: '',
});
const obtenerJugadores = () => {
    axios.get("http://localhost:8080/api/jugador/obtener?idClub=" + props.idClubLocal)
        .then((response) => {
            response.data.forEach((jugador) => {
                jugador.dni = formatDni.format(jugador.dni);
            })
            teamLocal.value = response.data
        })
        .catch((error) => {
        })
    axios.get("http://localhost:8080/api/jugador/obtener?idClub=" + props.idClubVisitante)
        .then((response) => {
            response.data.forEach((jugador) => {
                jugador.dni = formatDni.format(jugador.dni);
            })
            teamVisitante.value = response.data
        })
        .catch((error) => {
        })
}
onMounted(() => {
    obtenerJugadores()
})

function selectPlayer(player, team) {
    selectedPlayer.value = player;
    selectedPlayerTeam.value = team === 'local' ? props.local : props.visitante;
}

function closeModal() {
    selectedPlayer.value = null;
    selectedPlayerTeam.value = '';
}
function traerEventos() {
    axios.get("http://localhost:8080/api/eventos/" + props.partido)
        .then((response) => {
            eventosCargados.value = response.data;
        })
        .catch((error) => {
            console.log(error);
        })
}
function saveEvent() {
    if (newEvent.value.minuto === null || newEvent.value.minuto < 0) {
        alert('Por favor, ingresa un minuto válido.');
        return;
    }
    const data = {
        minuto: newEvent.value.minuto,
        tipo: newEvent.value.tipo,
        detalleExtra: newEvent.value.detalleExtra + " | |  " + newEvent.value.detalle,
        partido: newEvent.value.partido,
        jugador: selectedPlayer.value.id,
    }

    // // CORRECTO
    axios.post("http://localhost:8080/api/eventos/" + newEvent.value.partido + "/guardar",
        data // Envía el objeto directamente
    )
        .then((response) => {
            alert('Evento guardado correctamente');
            obtenerJugadores();
        })
        .catch((error) => {
            alert('Error al guardar el evento');
        })
    closeModal();
}
watch(selectedTab, () => {
    if (selectedTab.value === 'eventos_cargados') {
        traerEventos();
    }
})

</script>
